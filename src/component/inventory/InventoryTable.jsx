"use client";
import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { editDialog, setItemData } from "@/redux/Slice/editOpenSlice";
import { getDatabase, ref, remove } from "firebase/database";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const InventoryTable = ({ state, setState, setEdit, edit }) => {
  const PRODUCT_DATA = useSelector((state) => state.product_data.PRODUCT_DATA);
  const loading = useSelector((state) => state.product_data.loading);
  const SHOP_DATA = useSelector((state) => state.shop_data.SHOP_DATA);

  const USER_DATA = useSelector((state) => state.user_data.USER_DATA);
  const CATEGORYS = useSelector((state) => state.shop_data.CATEGORYS);

  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        size: 150,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 150,
      },

      {
        accessorKey: "stock",
        header: "Stock Quantity",
        size: 150,
      },
      {
        accessorKey: "category",
        header: "Sub Category",
        size: 150,
      },
    ],
    []
  );

  return (
    <div className="w-screen2">
      <MaterialReactTable
        state={{ isLoading: loading }}
        columns={columns}
        data={PRODUCT_DATA}
        enableRowActions
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  dispatch(editDialog(true));
                  dispatch(setItemData(PRODUCT_DATA[row.id]));
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={async () => {
                  const shopRef = doc(
                    getFirestore(),
                    "shop",
                    USER_DATA["shop_id"]
                  );
                  const category = CATEGORYS.find(
                    (item) => item["Name"] === PRODUCT_DATA[row.id].category
                  );
                  console.log(category);
                  await updateDoc(shopRef, {
                    category: {
                      ...SHOP_DATA["category"],
                      [category.Name]: {
                        Count: category.Count - 1,
                      },
                    },
                  }).then(() => {
                    const dataRef = ref(
                      getDatabase(),
                      "shop/" +
                        USER_DATA["shop_id"] +
                        "/" +
                        PRODUCT_DATA[row.id]["id"]
                    );

                    // Remove the data
                    remove(dataRef)
                      .then(() => {
                        console.log("Data deleted successfully");
                      })
                      .catch((error) => {
                        console.error("Error deleting data: ", error);
                      });
                  });
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </div>
  );
};

export default InventoryTable;
