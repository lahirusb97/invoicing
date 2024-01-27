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
import Image from "next/image";
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

  return (
    <div>
      <div className="w-screen h-screen m-2 flex justify-center items-center flex-wrap">
        <Card
          variant="elevation"
          elevation={2}
          className="flex flex-col p-2 w-96 items-center justify-center"
        >
          <Typography
            fontWeight={"bold"}
            variant="h6"
            className="pb-2 text-center"
          >
            Login In
          </Typography>
          <Image
            alt="login"
            style={{
              objectFit: "cover",
              maxWidth: "100%",
              maxHeight: "100%",
              backgroundPosition: "center",
            }}
            width={400}
            height={400}
            src={"/login.jpg"}
          />

          <TextField
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            value={email}
            focused
          />
          <TextField
            className="my-4"
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
