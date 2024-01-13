import AddItemDialog from "@/component/inventory/AddItemDialog";
import InventoryTab from "@/component/inventory/InventoryTab";
import InventoryTable from "@/component/inventory/InventoryTable";
import React from "react";

export default function page() {
  return (
    <div>
      <AddItemDialog />

      <InventoryTable />
    </div>
  );
}
