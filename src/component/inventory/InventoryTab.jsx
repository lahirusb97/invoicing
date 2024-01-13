"use client";

import { Tab } from "@headlessui/react";
import CategoriTable from "@/component/inventory/categoriTable";
import { useState } from "react";
import { Settings } from "@mui/icons-material";
import InventoryTable from "./InventoryTable";
export default function InventoryTab() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tab.Group>
      <Tab.List className="border-2 w-44 flex border-grayLite shadow-lg  rounded-md">
        <Tab className=" w-full ui-selected:text-purple ui-selected:bg-purplelite font-semibold text-black">
          Stocks
        </Tab>
        <Tab className="py-2 w-full ui-selected:text-purple ui-selected:bg-purplelite font-semibold text-black ">
          <Settings />
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <InventoryTable />
        </Tab.Panel>
        <Tab.Panel>
          <CategoriTable />
          {/* <div>
                <h1 className="text-myblue font-semibold text-lg">
                  Manage Category
                </h1>
                <TextField
                  id="outlined-basic"
                  label="Category Name"
                  variant="outlined"
                  placeholder="Apple Mobile"
                />
                <buttton className="bg-red-200">Add Category</buttton>
              </div> */}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
