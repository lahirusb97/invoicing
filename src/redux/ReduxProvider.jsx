"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import SnacBar from "@/component/SnacBar";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
      <SnacBar />
    </Provider>
  );
}
