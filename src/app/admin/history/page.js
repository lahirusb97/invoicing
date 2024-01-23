import HistoryTable from "@/component/history/HistoryTable";
import Typography from "@mui/material/Typography";
import React from "react";

import ToggleSwitch from "@/component/history/ToggleSwitch";

export default function page() {
  return (
    <div>
      <div>
        <Typography variant="h6">Filter Bills</Typography>
        <ToggleSwitch />
      </div>
    </div>
  );
}
