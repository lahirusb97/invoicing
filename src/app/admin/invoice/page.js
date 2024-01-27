import Header from "@/component/invoice/Header";
import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export default function page() {
  return (
    <div>
      <Card className="p-2" variant="elevation" elevation={2}>
        <Header />
      </Card>
    </div>
  );
}
