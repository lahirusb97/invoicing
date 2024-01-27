"use client";
import {
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
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

import { openScackbar } from "@/redux/Slice/SnackBarSlice";

export default function Home() {
  const [user] = useAuthState(auth);
  const route = useRouter();
  const [email, setEmail] = useState("lahirushirant@gmail.com");
  const [password, setPassword] = useState("qwertyu");
  const [uidCheck, setUidCheck] = useState(false);
  const [SignInWithEmailAndPassword, userData, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await SignInWithEmailAndPassword(email, password);

      if (error.code === "auth/user-not-found") {
        dispatch(
          openScackbar({
            open: true,
            type: "error",
            msg: "User not found. Please check the email.",
          })
        );
      } else if (error.code === "auth/wrong-password") {
        dispatch(
          openScackbar({
            open: true,
            type: "error",
            msg: "Incorrect password. Please try again.",
          })
        );
      } else {
        console.error("Login failed", error);
        dispatch(openScackbar({ open: true, type: "error", msg: error }));
      }
      getuserData();
    } catch (error) {}
  };
  useEffect(() => {
    const getuserData = async () => {
      if (user) {
        const citiesRef = collection(getFirestore(), "user");
        const q = query(citiesRef, where("uid", "==", user.uid));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              if (user.uid === doc.data().uid) {
                dispatch(setuserData({ user: doc.data(), loading: false }));
                route.push("/admin");
                dispatch(
                  openScackbar({
                    open: true,
                    type: "success",
                    msg: "login success",
                  })
                );
              }
            });
          } else {
            dispatch(setuserData({ user: [], loading: false }));
            route.push("/register");

            setUidCheck(false);
            dispatch(
              openScackbar({
                open: true,
                type: "success",
                msg: "login success",
              })
            );
          }
        });
      }
    };
    getuserData();
  }, [user]);

  return (
    <div>
      <div className="h-screen flex justify-center items-center flex-wrap">
        <Card
          variant="elevation"
          elevation={2}
          className="flex flex-col p-2 w-full sm:w-96 items-center justify-center"
        >
          <Typography
            fontWeight={"bold"}
            variant="h6"
            className="pb-2 text-center"
          >
            Login In
          </Typography>

          <img alt="login" width={380} src="/login.jpg" />

          <TextField
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            value={email}
            focused
          />
          <TextField
            sx={{ my: "1em" }}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            label="password"
            value={password}
            type="password"
            focused
          />

          {loading ? (
            <CircularProgress />
          ) : (
            <Button fullWidth onClick={handleLogin} variant="contained">
              Login
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
