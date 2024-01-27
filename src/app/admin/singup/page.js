"use client";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { auth } from "@/firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

// Corrected component name to start with an uppercase letter
export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Corrected hook function name to start with "use"
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleLogin = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="w-screen h-screen m-2 flex justify-center items-center">
      <div className="flex flex-col">
        <TextField onChange={(e) => setEmail(e.target.value)} label="Email" />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Password" // Corrected label
          type="password" // Set the type attribute for password input
        />
        <Button onClick={handleLogin} variant="contained">
          Signup {/* Corrected the spelling of "signup" */}
        </Button>
      </div>
    </div>
  );
}
