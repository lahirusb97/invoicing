"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { closePrintDialog } from "@/redux/Slice/invoicePrintSlice";
import { Card, Divider, Typography } from "@mui/material";
import { Phone } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useReactToPrint } from "react-to-print";
export default function PrintInvoice() {
  const open = useSelector((state) => state.invoice_print.OPEN);
  const DATA = useSelector((state) => state.invoice_print.DATA);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closePrintDialog(false));
  };
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Invoice Print"}</DialogTitle>
        <DialogContent ref={componentRef}>
          <Card
            className="p-2 flex flex-col justify-center items-center"
            variant="outlined"
          >
            <Typography fontWeight={"bold"} variant="h5">
              Shop Name
            </Typography>
            <div className="flex items-center">
              <Phone className="mx-2" />
              <Typography variant="body1">071-xxxxxxxx</Typography>
            </div>
            <Typography variant="body1">1st Street, Colombo</Typography>
          </Card>
          <div>
            <Typography fontWeight={"bold"} variant="subtitle1">
              Invoice Number: {DATA.invoice_num}
            </Typography>
            <Typography variant="subtitle1">
              Date: {DATA.date} - {DATA.time}
            </Typography>

            <Typography variant="body1">Name: {DATA.name}</Typography>
            <Typography variant="body1">Mobile: {DATA.mobile}</Typography>
          </div>
          <Divider color="black" />
          <div>
            <TableContainer component={Paper}>
              <Table
                size="small"
                sx={{ minWidth: 300 }}
                aria-label="spanning table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="right">#</TableCell>
                    <TableCell>Desc</TableCell>

                    <TableCell align="right">Unit Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DATA.items &&
                    DATA.items.map((row, index) => (
                      <TableRow key={row.desc}>
                        <TableCell align="right">{index}</TableCell>
                        <TableCell>
                          {row.name} <br /> X{row.qty}
                          <br />
                          Modal: {row.modal}
                          <br />
                          Warenty: {row.warenty}
                        </TableCell>

                        <TableCell align="right">{row.price}</TableCell>
                      </TableRow>
                    ))}

                  <TableRow>
                    <TableCell align="right" colSpan={2}>
                      Total
                    </TableCell>
                    <TableCell align="right">{DATA.grand_total}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" colSpan={2}>
                      Payment
                    </TableCell>
                    <TableCell align="right">{DATA.payment}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" colSpan={2}>
                      Blance
                    </TableCell>
                    <TableCell align="right">
                      {DATA.grand_total - DATA.payment}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handlePrint} autoFocus>
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
