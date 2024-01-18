import Header from "@/component/invoice/Header";
import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export default function page() {
  return (
    <div>
      <Typography variant="h5">Invoice #16498</Typography>

      <Card variant="elevation" elevation={2}>
        <Header />
      </Card>
    </div>
  );
}
