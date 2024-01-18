"use client";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { MaterialReactTable } from "material-react-table";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

import ItemsTable from "./ItemsTable";
import InvoiceItemDialog from "./InvoiceItemDialog";
import { Button, IconButton, InputAdornment, Tooltip } from "@mui/material";
import { Add, Delete, Minimize, PlusOne, Remove } from "@mui/icons-material";
import {
  addQty,
  minusQty,
  removeItem,
  resetInvoice,
} from "@/redux/Slice/invoiceSlice";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { openScackbar } from "@/redux/Slice/SnackBarSlice";

export default function Header() {
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [payment, setpayment] = useState("");
  const dispatch = useDispatch();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = new Intl.DateTimeFormat("en-US", { month: "numeric" }).format(
    currentDate
  );
  const day = currentDate.getDate();
  const formattedDate = `${year}/${month}/${day}`;
  const PRODUCT_DATA = useSelector((state) => state.product_data.PRODUCT_DATA);
  const [value, setValue] = React.useState("");
  const INVOICE_ITEMS = useSelector((state) => state.invoice_data.INVOICE_ITEM);

  const GRAND_TOTAL_COST = useSelector(
    (state) => state.invoice_data.GRAND_TOTAL_COST
  );
  const GRAND_TOTAL = useSelector((state) => state.invoice_data.GRAND_TOTAL);
  const SHOP_DATA = useSelector((state) => state.shop_data.SHOP_DATA);
  const USER_DATA = useSelector((state) => state.user_data.USER_DATA);

  const selectcategory = (event, value) => {
    setValue(value);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        size: 200,
      },
      {
        accessorKey: "qty",
        header: (
          <div className="text-center">
            {" "}
            {/* Apply the text-center class here */}
            Qty
          </div>
        ),
        size: 50,

        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <IconButton
              size="small"
              color="success"
              onClick={() => {
                dispatch(addQty(row.id));
              }}
            >
              <Add fontSize="small" />
            </IconButton>

            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <h4>{renderedCellValue}</h4>

            <IconButton
              size="small"
              color="success"
              onClick={() => {
                dispatch(minusQty(row.id));
              }}
            >
              <Remove fontSize="small" />
            </IconButton>
          </Box>
        ),
      },

      {
        accessorKey: "warenty",
        header: "Warranty",
        size: 50,
      },
      {
        accessorKey: "price",
        header: (
          <div style={{ position: "relative", textAlign: "left" }}>
            <div className="text-end">Unit Price Rs</div>
          </div>
        ),
        size: 50,

        Cell: ({ renderedCellValue, row }) => (
          <div className="flex justify-start">
            <Typography className="text-end">
              Rs. {renderedCellValue}
            </Typography>
          </div>
        ),
      },
    ],
    []
  );
  const handleBill = async () => {
    if (name.length === 0) {
      setNameError(true);
    }
    if (mobile.length === 0) {
      setMobileError(true);
    }
    if (payment.length === 0) {
      setPaymentError(true);
    }

    if (INVOICE_ITEMS.length === 0) {
      dispatch(
        openScackbar({ open: true, type: "error", msg: "Select Billing Items" })
      );
    }

    if (
      name.length > 0 &&
      mobile.length > 0 &&
      payment.length > 0 &&
      INVOICE_ITEMS.length > 0
    ) {
      setPaymentError(false);
      setMobileError(false);
      setNameError(false);

      const pushData = {
        name: name,
        mobile: mobile,
        payment: [
          {
            payment: parseFloat(payment),
            date: Timestamp.fromDate(currentDate),
          },
        ],
        blance: parseFloat(payment) < GRAND_TOTAL ? true : false,
        items: INVOICE_ITEMS.map(({ cost, id, ...rest }) => rest),
        date: Timestamp.fromDate(currentDate),
        invoice_id: SHOP_DATA["invoice_number"] + 1,
        grand_total: GRAND_TOTAL,
        total_cost: GRAND_TOTAL_COST,
      };

      // Reference to the subcollection
      const db = getFirestore();
      const userId = USER_DATA["shop_id"];
      const year = "2024";

      // Reference to the subcollection
      // Make sure userId and year are valid values
      const subcollectionRef = collection(doc(db, "invoice", userId), year);

      // Add a new document to the subcollection
      try {
        await addDoc(subcollectionRef, pushData);
        dispatch(
          openScackbar({ open: true, type: "success", msg: "Bill Updated" })
        );
        dispatch(resetInvoice());
        setpayment("");
      } catch (error) {
        openScackbar({ open: true, type: "error", msg: error });
      }
    }
  };

  return (
    <div>
      <div>
        <Typography variant="h6" className="">
          Date: {formattedDate}
        </Typography>
      </div>
      <div className=" flex items-center flex-wrap">
        <div className="flex">
          <TextField
            type="text"
            className="my-2 mr-2"
            onChange={(e) => setName(e.target.value)}
            size="small"
            label="Customer Name"
            value={name}
            error={nameError}
            helperText={nameError && "Enter Coustomer Name"}
          />
          <TextField
            type="text"
            className="my-2 mr-2"
            onChange={(e) => setMobile(e.target.value)}
            size="small"
            label="Mobile Number"
            value={mobile}
            error={mobileError}
            helperText={mobileError && "Enter Coustomer Mobile Number"}
          />
        </div>
      </div>
      <InvoiceItemDialog />

      <div style={{ marginBottom: "1em" }}>
        <MaterialReactTable
          enableBottomToolbar
          options={{
            search: false,
            filtering: false,
            sorting: false,
          }}
          enableRowActions
          renderBottomToolbar={({ table }) => (
            <div className="flex justify-center">
              <div>
                <Typography className="" variant="h6">
                  Grand Total : RS {GRAND_TOTAL}
                </Typography>
                <div className="flex items-center">
                  <TextField
                    type="number"
                    size="small"
                    label="Coustomer Payment"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "25ch" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">RS</InputAdornment>
                      ),
                    }}
                    value={payment}
                    onChange={(e) => setpayment(e.target.value)}
                    error={paymentError}
                    helperText={paymentError && "Enter Coustomer Payied Amount"}
                  />
                  <Button onClick={handleBill} variant="contained">
                    Bill
                  </Button>
                </div>
              </div>
            </div>
          )}
          renderRowActions={({ row }) => (
            <Box>
              <IconButton
                color="error"
                size="small"
                onClick={() => {
                  dispatch(removeItem(row.id));
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          )}
          initialState={{ density: "compact" }}
          columns={columns}
          data={INVOICE_ITEMS}
        />
      </div>
    </div>
  );
}
