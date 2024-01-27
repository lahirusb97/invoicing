"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
export default function Page() {
  const [user] = useAuthState(auth);

  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name.length > 1 &&
      formData.shopName.length > 1 &&
      formData.mobile.length === 10
    ) {
      const shopCollection = collection(getFirestore(), "shop");
      const usercollection = collection(getFirestore(), "user");
      try {
        const newDocRef = await addDoc(shopCollection, {
          name: formData.shopName,
          mobile: formData.mobile,
          email: user.email,
        });
        console.log("Document added with ID: ", newDocRef.id);
        const newUser = await addDoc(usercollection, {
          name: formData.shopName,
          mobile: formData.mobile,
          email: user.email,
          uid: user.uid,
          shop_id: newDocRef.id,
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      console.log(formData.name.length);
    }
  };

  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            margin: "auto",
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Shop Name"
            variant="outlined"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Mobile"
            variant="outlined"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            color="primary"
            type="submit"
            variant="contained"
            sx={{ marginTop: "16px" }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}
