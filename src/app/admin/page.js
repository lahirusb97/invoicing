"use client";
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import ReactEcharts from "echarts-for-react";
import { Card, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DailyIncomeChart from "@/component/dashboard/DailyIncomeChart";

export default function AdminPage() {
  const USER_DATA = useSelector((state) => state.user_data.USER_DATA);
  const loading = useSelector((state) => state.user_data.loading);
  const [dashboardData, setDashboardData] = useState({});

  const [selectDate, setSelectDate] = useState(dayjs(new Date()));

  useEffect(() => {
    if (!loading) {
      const dataget = async () => {
        const documentRef = doc(
          collection(
            getFirestore(),
            "dashboard",
            USER_DATA["shop_id"],
            selectDate["$y"].toString()
          ),
          (selectDate["$M"] + 1).toString()
        );

        try {
          onSnapshot(documentRef, (snapshot) => {
            if (snapshot.exists()) {
              setDashboardData(snapshot.data());
            } else {
              setDashboardData({
                daily_income: {},
                total_cost: 0,
                total_income: 0,
              });
            }
          });
        } catch (error) {
          console.error("Error getting document:", error);
        }
      };
      dataget();
    }
  }, [loading, selectDate]);
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    color: ["red", "green"],
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: "{b}: Rs. {c}",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: dashboardData.total_cost, name: "Cost" },
          { value: dashboardData.total_income, name: "Profit" },
        ],
        // color: ["#ff0000", "#00ff00", "#0000ff"],
      },
    ],
  };
  return (
    <div className="flex items-center flex-wrap justify-evenly">
      <Card
        className="flex items-center flex-wrap"
        variant="elevation"
        elevation={2}
      >
        <div className="mx-4">
          <Typography className="p-2" variant="h6">
            Monthly Total Income
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                value={selectDate}
                label={"select month"}
                views={["month", "year"]}
                onChange={(e) => setSelectDate(e)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <ReactEcharts
          style={{ width: "400px", height: "400px" }}
          option={option}
        ></ReactEcharts>
        <div>
          <Typography className="text-center" variant="h6">
            Daily Income Chart
          </Typography>
          <DailyIncomeChart dashboardData={dashboardData} />
        </div>
      </Card>
    </div>
  );
}
