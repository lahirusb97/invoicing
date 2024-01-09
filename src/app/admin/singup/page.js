"use client";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { auth } from "@/firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          label="password"
        />
        <Button onClick={handleLogin} variant="contained">
          singup
        </Button>
      </div>
    </div>
  );
}
