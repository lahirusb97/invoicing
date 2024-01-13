"use client";
import { Box } from "@mui/material";
import React, { useEffect } from "react";

import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
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
export default function RefreshHandler({ children }) {
  const [user, stateLoading, stateError] = useAuthState(auth);
  const dispatch = useDispatch();
  const route = useRouter();
  if (!stateLoading && !user) {
    redirect("/");
  }

  useEffect(() => {
    if (!stateLoading && user) {
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
    <Box component="main" sx={{ flexGrow: 1, mt: 9, ml: 1 }}>
      {children}
    </Box>
  );
}
