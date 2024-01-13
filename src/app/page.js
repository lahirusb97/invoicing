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
import { useDispatch } from "react-redux";
import { setuserData } from "@/redux/Slice/userDataSlice";

export default function Home() {
  const [user] = useAuthState(auth);
  const route = useRouter();
  const [email, setEmail] = useState("lahirushirant@gmail.com");
  const [password, setPassword] = useState("qwertyu");
  const [uidCheck, setUidCheck] = useState(false);
  const [SignInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await SignInWithEmailAndPassword(email, password);
      getuserData();
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  useEffect(() => {
    if (user) {
      getuserData();
    }
  }, [user]);

  const getuserData = async () => {
    if (user) {
      const citiesRef = collection(getFirestore(), "user");
      const q = query(citiesRef, where("uid", "==", user.uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            if (user.uid === doc.data().uid) {
              dispatch(setuserData({ user: doc.data(), loading: false }));
              route.push("/admin");
            }
          });
        } else {
          dispatch(setuserData({ user: [], loading: false }));
          route.push("/register");

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
