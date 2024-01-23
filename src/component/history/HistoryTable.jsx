"use client";
import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";
import { editDialog, setItemData } from "@/redux/Slice/editOpenSlice";
import { getDatabase, ref, remove } from "firebase/database";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import {
  openCloseInvoiceEdit,
  setInvoiceData,
} from "@/redux/Slice/invoice/invoiceEditSlice";

const HistoryTable = ({ loading, invoiceData }) => {
  const USER_DATA = useSelector((state) => state.user_data.USER_DATA);

  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        accessorKey: "invoice_id",
        header: "#",
        size: 150,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 150,
      },

      {
        accessorKey: "name",
        header: "Coustomer Name",
        size: 150,
      },
      {
        accessorKey: "grand_total",
        header: "Total Amount",
        size: 150,
      },
      {
        accessorKey: "payment",
        header: "Paied Amount",
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <Typography variant="inherit">Rs.{renderedCellValue}</Typography>
        ),
      },
      {
        header: "Blance",
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <div className="flex">
            <Typography
              color={
                row.original["grand_total"] - row.original["payment"] > 0
                  ? "red"
                  : "green"
              }
              variant="h6"
            >
              Rs.
            </Typography>
            <Typography
              color={
                row.original["grand_total"] - row.original["payment"] > 0
                  ? "red"
                  : "green"
              }
              fontWeight={"bold"}
              variant="h6"
            >
              {row.original["grand_total"] - row.original["payment"]}
            </Typography>
          </div>
        ),
      },
    ],
    []
  );
  const [payment, setPayment] = useState("");
  const handleNewPayment = (id) => {
    if (payment.length > 0) {
      //ADD NEW PAYMENT
      const data = invoiceData[id];
      const year = data.date.toDate().getFullYear().toString();
      const subcollection = doc(
        collection(
          getFirestore(),
          "invoice",
          USER_DATA.shop_id,
          year.toString()
        ),
        data["id"]
      );
      updateDoc(subcollection, {
        payment_history: arrayUnion({
          date: new Date(),
          payment: payment,
        }),
      })
        .then(() => {
          console.log("ok");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <MaterialReactTable
      options={{
        columnResizing: true,
        width: "100vw",
      }}
      state={{ isLoading: loading }}
      columns={columns}
      data={invoiceData.map((item) => ({
        key: item.invoice_id,
        ...item,
        date: item.date.toDate().toLocaleDateString(),
      }))}
      enableRowActions
      renderRowActions={({ row }) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                dispatch(openCloseInvoiceEdit(true));
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={async () => {
                console.log(invoiceData[row.id].date.format("YYYY").toString());
                // const shopRef = doc(
                //   collection(
                //     getFirestore(),
                //     "invoice",
                //     USER_DATA.shop_id,
                //     invoiceData[row.id].date.format("YYYY").toString()
                //   )
                // )
                //   // Remove the data
                //   .remove(dataRef)
                //   .then(() => {
                //     console.log("Data deleted successfully");
                //   })
                //   .catch((error) => {
                //     console.error("Error deleting data: ", error);
                //   });
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      renderDetailPanel={({ row }) => (
        <div>
          <Typography variant="h6">Invoice Details</Typography>
          <div>
            <TableContainer component={Paper}>
              <Table
                size="small"
                sx={{ minWidth: 300 }}
                aria-label="spanning table"
              >
                <TableHead>
                  <TableRow className="bg-gray-700 ">
                    <TableCell
                      className="text-white font-semibold"
                      align="center"
                      colSpan={4}
                    >
                      Details
                    </TableCell>
                    <TableCell
                      className="text-white font-semibold"
                      align="right"
                    >
                      Price
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-600 ">
                    <TableCell className="text-white font-semibold">
                      Name
                    </TableCell>
                    <TableCell
                      className="text-white font-semibold"
                      align="left"
                    >
                      Qty.
                    </TableCell>
                    <TableCell
                      className="text-white font-semibold"
                      align="left"
                    >
                      Modal Number
                    </TableCell>
                    <TableCell
                      className="text-white font-semibold"
                      align="left"
                    >
                      Warenty
                    </TableCell>
                    <TableCell
                      className="text-white font-semibold"
                      align="right"
                    >
                      Unit Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceData[row.id].items.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="capitalize">{row.name}</TableCell>
                      <TableCell align="left">{row.qty}</TableCell>
                      <TableCell align="left">{row.modal}</TableCell>
                      <TableCell align="left">{row.warenty}</TableCell>
                      <TableCell align="right">Rs.{row.price}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell align="right" colSpan={4}>
                      Grand Total
                    </TableCell>
                    <TableCell align="right">
                      Rs.{invoiceData[row.id]["grand_total"]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" colSpan={4}>
                      Total Paied Amoust
                    </TableCell>
                    <TableCell align="right">
                      Rs.{invoiceData[row.id]["payment"]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" colSpan={4}>
                      Blance{" "}
                    </TableCell>
                    <TableCell align="right">
                      Rs.
                      {invoiceData[row.id]["grand_total"] -
                        invoiceData[row.id]["payment"]}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div className="flex flex-wrap items-end">
              <div>
                <Typography variant="h6">Payment History</Typography>

                <TableContainer component={Paper}>
                  <Table
                    size="small"
                    sx={{ maxWidth: 300 }}
                    aria-label="spanning table"
                  >
                    <TableHead>
                      <TableRow className="bg-gray-700 ">
                        <TableCell
                          className="text-white font-semibold"
                          align="left"
                        >
                          Date
                        </TableCell>
                        <TableCell
                          className="text-white font-semibold"
                          align="right"
                        >
                          Amoust
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoiceData[row.id].payment_history.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell align="left" className="capitalize">
                            {row.date.toDate().toLocaleDateString()}
                          </TableCell>
                          <TableCell align="right">Rs.{row.payment}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="flex item-center mx-0 sm:mx-2">
                <TextField
                  type="number"
                  onChange={(e) => setPayment(e.target.value)}
                  value={payment}
                  size="small"
                  placeholder="Enter Coustomer Payment"
                  label="new Payment"
                  variant="outlined"
                />
                <Button
                  onClick={() => handleNewPayment(row.id)}
                  variant="contained"
                >
                  Pay
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default HistoryTable;
