"use client";
import * as React from "react";

import Slide from "@mui/material/Slide";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ItemsTable from "./ItemsTable";
import { Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InvoiceItemDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Select Invoice Items
      </Button>
      <Drawer
        BackdropProps={{ invisible: true }}
        anchor={"bottom"}
        open={open}
        onClose={handleClose}
      >
        <div className="p-2">
          <Typography variant="h6">Select Items</Typography>
          <ItemsTable />
        </div>
      </Drawer>
    </React.Fragment>
  );
}
