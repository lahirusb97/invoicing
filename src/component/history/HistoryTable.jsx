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
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  openCloseInvoiceEdit,
  setInvoiceData,
} from "@/redux/Slice/invoice/invoiceEditSlice";
import { openPrintDialog } from "@/redux/Slice/invoicePrintSlice";
import { openScackbar } from "@/redux/Slice/SnackBarSlice";

const HistoryTable = ({ loading, invoiceData }) => {
  const USER_DATA = useSelector((state) => state.user_data.USER_DATA);

  const MONTH_INCOME = useSelector(
    (state) => state.dashboard_data.MONTH_INCOME
  );
  const timeFormat = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 24-hour format
  });
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
  const handleNewPayment = async (id) => {
    if (
      payment.length > 0 &&
      parseInt(payment) >= 0 &&
      parseInt(payment) <=
        invoiceData[id]["grand_total"] - invoiceData[id]["payment"]
    ) {
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
        payment: invoiceData[id]["payment"] + parseInt(payment),

        payment_history: arrayUnion({
          date: new Date(),
          payment: parseInt(payment),
        }),
      })
        .then(() => {
          const currentDate = new Date();
          if (MONTH_INCOME.day_income.hasOwnProperty(new Date().getDate())) {
            // The key exists in the object

            const handleDashboard = async () => {
              const subcollection = doc(
                collection(
                  getFirestore(),
                  "dashboard",
                  USER_DATA.shop_id,
                  year.toString()
                ),
                (currentDate.getMonth() + 1).toString()
              );
              const newData = {
                day_income: {
                  [currentDate.getDate()]: {
                    amount:
                      MONTH_INCOME.day_income[currentDate.getDate()].amount +
                      parseInt(payment),
                    cost: MONTH_INCOME.day_income[currentDate.getDate()].cost,
                  },
                },
                total_income: MONTH_INCOME.total_income + parseInt(payment),
              };

              // Update the document with the new data
              try {
                await updateDoc(subcollection, newData);
                dispatch(
                  openScackbar({
                    open: true,
                    type: "success",
                    msg: "Invoice Updated",
                  })
                );
                setPayment("");
              } catch (error) {
                dispatch(
                  openScackbar({ open: true, type: "error", msg: error })
                );
              }
            };
            handleDashboard();
            //**************** */
          } else {
            // The key does not exist in the object
            const setDashboard = async () => {
              const currentDate = new Date();

              const subcollection = doc(
                collection(
                  getFirestore(),
                  "dashboard",
                  USER_DATA.shop_id,
                  currentDate.getFullYear().toString()
                ),
                (currentDate.getMonth() + 1).toString()
              );

              const pushData = {
                day_income: {
                  [new Date().getDate()]: {
                    amount: parseInt(payment),
                    cost: 0,
                  },
                },
                total_income: MONTH_INCOME.total_income + parseInt(payment),
                total_cost: MONTH_INCOME.total_cost + parseInt(payment),
              };
              try {
                await setDoc(subcollection, pushData);
                setPayment("");

                dispatch(
                  openScackbar({
                    open: true,
                    type: "success",
                    msg: "Invoice Updated",
                  })
                );
              } catch (error) {
                dispatch(
                  openScackbar({ open: true, type: "error", msg: error })
                );
              }
            };
            setDashboard();
          }
        })
        .catch((error) => {
          dispatch(openScackbar({ open: true, type: "error", msg: error }));
        });
    } else {
      //! Imput Error Handling

      if (
        parseInt(payment) >=
        invoiceData[id]["grand_total"] - invoiceData[id]["payment"]
      ) {
        dispatch(
          openScackbar({
            open: true,
            type: "error",
            msg: `coustomer only need to pay Rs. ${
              invoiceData[id]["grand_total"] - invoiceData[id]["payment"]
            }`,
          })
        );
      }
      if (parseInt(payment) <= 0) {
        dispatch(
          openScackbar({
            open: true,
            type: "error",
            msg: "Payment should be greater than 0",
          })
        );
      }
      if (parseInt(payment).length === 0) {
        dispatch(
          openScackbar({
            open: true,
            type: "error",
            msg: "Payment cant be empty",
          })
        );
      }
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
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={async () => {
                const shopRef = doc(
                  collection(
                    getFirestore(),
                    "invoice",
                    USER_DATA.shop_id,
                    invoiceData[row.id].date.toDate().getFullYear().toString()
                  ),
                  invoiceData[row.id]["id"]
                );
                // Remove the data
                await deleteDoc(shopRef)
                  .then(() => {
                    console.log("Data deleted successfully");
                  })
                  .catch((error) => {
                    console.error("Error deleting data: ", error);
                  });
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
                      Total Paied Amount
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
                    sx={{ maxWidth: 350 }}
                    aria-label="spanning table"
                  >
                    <TableHead>
                      <TableRow className="bg-gray-700 ">
                        <TableCell
                          className="text-white font-semibold"
                          align="center"
                        >
                          Date
                        </TableCell>
                        <TableCell
                          className="text-white font-semibold"
                          align="center"
                        >
                          Time
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
                          <TableCell align="left" className="capitalize">
                            {timeFormat.format(row.date.toDate())}
                          </TableCell>
                          <TableCell align="right">Rs.{row.payment}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              {invoiceData[row.id].grand_total > invoiceData[row.id].payment ? (
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
              ) : (
                <Typography
                  variant="h6"
                  color={"success.main"}
                  fontWeight={"bold"}
                  margin={"0 10px"}
                >
                  Payment Complete
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(
                    openPrintDialog({
                      open: true,
                      data: {
                        name: invoiceData[row.id].name,
                        mobile: invoiceData[row.id].mobile,
                        items: invoiceData[row.id].items,
                        grand_total: invoiceData[row.id].grand_total,
                        payment: invoiceData[row.id].payment,
                        invoice_num: invoiceData[row.id]["invoice_number"],
                        date: `${invoiceData[row.id].date
                          .toDate()
                          .getFullYear()}/${
                          invoiceData[row.id].date.toDate().getMonth() + 1
                        }/${invoiceData[row.id].date.toDate().getDate()}`,
                        time: timeFormat.format(invoiceData[row.id].date),
                      },
                    })
                  );
                }}
              >
                Print Invoice
              </Button>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default HistoryTable;
