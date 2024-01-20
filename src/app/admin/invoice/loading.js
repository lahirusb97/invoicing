import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
export default function loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <CircularProgress />
    </div>
  );
}
