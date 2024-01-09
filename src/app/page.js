"use client";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { redirect, useRouter } from "next/navigation";
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
export default function Home() {
  const [user] = useAuthState(auth);
  const route = useRouter();
  const [email, setEmail] = useState("lahirushirant@gmail.com");
  const [password, setPassword] = useState("qwertyu");
  const [uidCheck, setUidCheck] = useState(false);
  const [SignInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const router = useRouter();
  const handleLogin = async () => {
    try {
      await SignInWithEmailAndPassword(email, password);
      getuserData();
    } catch (error) {
      console.error("Login failed", error);
      return;
    }
  };
  useEffect(() => {
    if (user) {
      getuserData();
      if (uidCheck) {
        route.push("/admin/dashboard");
      }
    }
  }, [user]);

  const getuserData = async () => {
    if (user) {
      const citiesRef = collection(getFirestore(), "user");
      const q = query(citiesRef, where("uid", "==", user.uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            if (user.uid === doc.data().uid) {
              route.push("/admin/dashboard");
              setUidCheck(true);
            } else {
              setUidCheck(false);
            }
          });
        } else {
          setUidCheck(false);
        }
      });
    }
  };

  return (
    <div>
      {
        <div className="w-screen h-screen m-2 flex justify-center items-center">
          <div className="flex flex-col">
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              label="password"
            />

            <Button onClick={handleLogin} variant="contained">
              Login
            </Button>
          </div>
        </div>
      }
    </div>
  );
}
