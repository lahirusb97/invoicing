import React from "react";
import ReactEcharts from "echarts-for-react";
import { BarChart } from "@mui/x-charts";

export default function DailyIncomeChart({ dashboardData }) {
  const dataList = () => {
    const list = [];
    if (dashboardData.day_income) {
      Object.keys(dashboardData.day_income).map((key) => {
        list.push({ day: key, ...dashboardData.day_income[key] });
      });
    }
    return list;
  };

  const app = {};
  const posList = [
    "left",
    "right",
    "top",
    "bottom",
    "inside",
    "insideTop",
    "insideLeft",
    "insideRight",
    "insideBottom",
    "insideTopLeft",
    "insideTopRight",
    "insideBottomLeft",
    "insideBottomRight",
  ];
  app.configParameters = {
    rotate: {
      min: -90,
      max: 90,
    },
    align: {
      options: {
        left: "left",
        center: "center",
        right: "right",
      },
    },
    verticalAlign: {
      options: {
        top: "top",
        middle: "middle",
        bottom: "bottom",
      },
    },
    position: {
      options: posList.reduce(function (map, pos) {
        map[pos] = pos;
        return map;
      }, {}),
    },
    distance: {
      min: 0,
      max: 100,
    },
  };
  app.config = {
    rotate: 90,
    align: "left",
    verticalAlign: "middle",
    position: "insideBottom",
    distance: 15,
    onChange: function () {
      const labelOption = {
        rotate: app.config.rotate,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        position: app.config.position,
        distance: app.config.distance,
      };
      myChart.setOption({
        series: [
          {
            label: labelOption,
          },
          {
            label: labelOption,
          },
          {
            label: labelOption,
          },
          {
            label: labelOption,
          },
        ],
      });
    },
  };
  const labelOption = {
    show: true,
    position: app.config.position,
    distance: app.config.distance,
    align: app.config.align,
    verticalAlign: app.config.verticalAlign,
    rotate: app.config.rotate,
    formatter: "Rs.{c} ",
    fontSize: 16,
    rich: {
      name: {},
    },
  };
  const option2 = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Total", "Profit", "Cost"],
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar", "stack"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: dataList().map((item) => item.day),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Total",
        type: "bar",
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: dataList().map((item) => item.amount),
        itemStyle: {
          color: "black", // Set your desired color for this series
        },
      },
      {
        name: "Profit",
        type: "bar",
        label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: dataList().map((item) => item.amount - item.cost),
        itemStyle: {
          color: "green",
          // Set your desired color for this series
        },
      },
      {
        name: "Cost",
        type: "bar",
        label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: dataList().map((item) => item.cost),
        itemStyle: {
          color: "red", // Set your desired color for this series
        },
      },
    ],
  };

  return (
    <div>
      <ReactEcharts
        style={{ width: "95vw", height: "300px" }}
        option={option2}
      ></ReactEcharts>
      {/* <BarChart
        width={500}
        height={300}
        series={[
          { data: pData, label: "pv", id: "pvId", stack: "total" },
          { data: uData, label: "uv", id: "uvId", stack: "total" },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      /> */}
    </div>
  );
}
