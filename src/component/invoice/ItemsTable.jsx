"use client";
import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

import { addInvoiceItem } from "@/redux/Slice/invoiceSlice";

const ItemsTable = ({ state, setState, setEdit, edit }) => {
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
    <MaterialReactTable
      initialState={{ density: "compact" }}
      options={{
        columnResizing: true,
        width: "100vw",
      }}
      state={{ isLoading: loading }}
      columns={columns}
      data={PRODUCT_DATA}
      enableRowActions
      renderRowActions={({ row }) => (
        <Box sx={{ display: "flex", gap: "1rem" }} className="items-baseline">
          <IconButton
            size="small"
            sx={{ background: "green", ":hover": { background: "#a039a9" } }}
            color="success"
            onClick={() => {
              const selectedItem = PRODUCT_DATA[row.id];
              const { name, cost, price, warenty, modal, id } = selectedItem;
              const newObject = {
                name,
                cost,
                price,
                warenty,
                modal,
                id,
                qty: 1,
              };

              dispatch(addInvoiceItem(newObject));
            }}
          >
            <Add sx={{ color: "white" }} fontSize="small" />
          </IconButton>
        </Box>
      )}
    />
  );
};

export default ItemsTable;
