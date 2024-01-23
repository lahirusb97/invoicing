"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import HistoryTable from "./HistoryTable";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Button from "@mui/material/Button";

import {
  Timestamp,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { openScackbar } from "@/redux/Slice/SnackBarSlice";
import InvoiceEditDialog from "./InvoiceEditDialog";
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export default function ToggleSwitch() {
  const [filterSwitch, setFilterSwitch] = React.useState(true);
  const [selectDate, setSelectDate] = React.useState(dayjs(new Date()));
  const loading = useSelector((state) => state.user_data.loading);
  const USER_DATA = useSelector((state) => state.user_data.USER_DATA);
  const [loadingInvoice, setloadingInvoice] = React.useState(false);
  const [invoiceData, setInvoiceData] = React.useState([]);

  //OPEN DIALOG
  const [open, setOpen] = React.useState(false);
  //
  const dispatch = useDispatch();
  const getInvoiceData = async () => {
    // Assuming selectDate is a Day.js object
    setloadingInvoice(true);
    if (!filterSwitch) {
      const startOfMonthDate = dayjs(selectDate).startOf("month");
      const endOfMonthDate = dayjs(selectDate).endOf("month");

      const querySnapshot = await getDocs(
        query(
          collection(
            getFirestore(),
            "invoice",
            USER_DATA.shop_id,
            selectDate.format("YYYY").toString()
          ),
          where("date", ">=", Timestamp.fromDate(startOfMonthDate.toDate())),
          where("date", "<=", Timestamp.fromDate(endOfMonthDate.toDate()))
        )
      ).catch((error) => {
        dispatch(
          openScackbar({ open: true, type: "error", msg: error.message })
        );
        setloadingInvoice(false);
      });

      const invoiceDataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInvoiceData(invoiceDataArray);
      setloadingInvoice(false);
    } else {
      const startOfDay = dayjs(selectDate).startOf("day");
      const endOfDay = dayjs(selectDate).endOf("day");

      const querySnapshot = await getDocs(
        query(
          collection(
            getFirestore(),
            "invoice",
            USER_DATA.shop_id,
            selectDate.format("YYYY").toString()
          ),
          where("date", ">=", Timestamp.fromDate(startOfDay.toDate())),
          where("date", "<=", Timestamp.fromDate(endOfDay.toDate()))
        )
      ).catch((error) => {
        dispatch(
          openScackbar({ open: true, type: "error", msg: error.message })
        );
        setloadingInvoice(false);
      });

      const invoiceDataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInvoiceData(invoiceDataArray);
      setloadingInvoice(false);
    }
  };
  return (
    <div>
      <FormGroup>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Monthly</Typography>
          <AntSwitch
            onChange={(e) => setFilterSwitch(e.target.checked)}
            defaultChecked
            value={filterSwitch}
            inputProps={{ "aria-label": "ant design" }}
          />
          <Typography>Daily</Typography>
        </Stack>
      </FormGroup>
      <div className="flex">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              value={selectDate}
              label={filterSwitch ? "select date" : "select month"}
              views={
                filterSwitch ? ["month", "year", "day"] : ["month", "year"]
              }
              onChange={(e) => setSelectDate(e)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button variant="contained" onClick={getInvoiceData}>
          Filter Bills
        </Button>
      </div>

      <HistoryTable loading={loadingInvoice} invoiceData={invoiceData} />
      <InvoiceEditDialog />
    </div>
  );
}
