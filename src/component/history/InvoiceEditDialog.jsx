"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import { openCloseInvoiceEdit } from "@/redux/Slice/invoice/invoiceEditSlice";

export default function InvoiceEditDialog() {
  const open = useSelector((state) => state.invoice_edit_open.OPEN);
  const USER_DATA = useSelector((state) => state.user_data.USER_DATA);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(openCloseInvoiceEdit(false));
  };
  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add new Item"}</DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
    </div>
  );
}
