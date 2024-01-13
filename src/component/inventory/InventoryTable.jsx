"use client";
import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { editDialog, setItemData } from "@/redux/Slice/editOpenSlice";

const InventoryTable = ({ state, setState, setEdit, edit }) => {
  const PRODUCT_DATA = useSelector((state) => state.product_data.PRODUCT_DATA);
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
      options={{
        columnResizing: true,
        width: "100vw",
      }}
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
            <IconButton color="error" onClick={() => handleDelete(row)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      muiTableBodyRowProps={({ row }) => ({
        onClick: (event) => {
          // console.log(data[row.index]);
          // if (Stock_manage) {
          //   setState(true);
          //   setEdit(true, data[row.index]);
          // } else {
          //   setState(false);
          //   setEdit(false, {});
          // }
        },
        sx: {
          cursor: "pointer", //you might want to change the cursor too when adding an onClick
        },
      })}
    />
  );
};

export default InventoryTable;
