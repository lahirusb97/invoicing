"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Calculate,
  Dashboard,
  DocumentScanner,
  History,
  Inventory,
  Logout,
  People,
  Settings,
} from "@mui/icons-material";
import Link from "next/link";
import { auth, firestore } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import { setProductData } from "@/redux/Slice/productDataSlice";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { setShopData } from "@/redux/Slice/shopDataSlice";
import { setSalesData } from "@/redux/Slice/dashboardSlice";
import { usePathname } from "next/navigation";
import { Typography } from "@mui/material";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "white",

  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Nav({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [user, stateLoading, stateError] = useAuthState(auth);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  //REDUX STORE LOADING
  const USER_DATA = useSelector((state) => state.user_data.USER_DATA);
  const pathName = usePathname();
  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const listItem = [
    { name: "Dashboard", icon: <Dashboard />, rPath: "/admin" },
    { name: "Inventory", icon: <Inventory />, rPath: "/admin/inventory" },
    { name: "Invoice", icon: <DocumentScanner />, rPath: "/admin/invoice" },
    { name: "Invoice History", icon: <History />, rPath: "/admin/history" },
  ];

  React.useEffect(() => {
    if (USER_DATA["shop_id"]) {
      try {
        dispatch(setProductData({ product: [], loading: true }));
        setSalesData({ incomeData: [], loading: true });

        const db = getDatabase();
        const shopRef = ref(db, "shop/" + USER_DATA["shop_id"]);
        onValue(shopRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            dispatch(
              setProductData({ product: Object.values(data), loading: false })
            );
            const shopData = (id) => {
              const unsub = onSnapshot(
                doc(getFirestore(), "shop", id),
                (doc) => {
                  if (doc.exists()) {
                    dispatch(
                      setShopData({ shopdata: doc.data(), loading: false })
                    );
                  } else {
                    dispatch(setShopData({ shopdata: [], loading: false }));
                  }
                }
              );
            };
            shopData(USER_DATA["shop_id"]);
          } else {
            dispatch(setProductData({ product: [], loading: false }));
          }
        });

        const dataget = async () => {
          const documentRef = doc(
            collection(
              getFirestore(),
              "dashboard",
              USER_DATA["shop_id"],
              year.toString()
            ),
            (currentDate.getMonth() + 1).toString()
          );

          try {
            onSnapshot(documentRef, (snapshot) => {
              if (snapshot.exists()) {
                dispatch(
                  setSalesData({ incomeData: snapshot.data(), loading: false })
                );
              } else {
              }
            });
          } catch (error) {
            console.error("Error getting document:", error);
          }
        };
        dataget();
      } catch (error) {
        console.log(error);
      }
    }
  }, [USER_DATA]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <div>
        {" "}
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <div className="flex">
              <IconButton
                color="primary"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography className="ml-4 text-black" variant="h6">
                {pathName === "/admin/inventory"
                  ? "Inventory"
                  : pathName === "/admin/invoice"
                  ? "Invoice"
                  : pathName === "/admin/history"
                  ? "Invoice History"
                  : "Dashboard"}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader className="flex justify-between">
            <Typography className="ml-4" variant="h6">
              My Shop
            </Typography>

            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <List>
            {listItem.map((item, index) => (
              <ListItem
                key={item["name"]}
                disablePadding
                sx={{
                  display: "block",
                  bgcolor: pathName === item["rPath"] ? "#a039a9" : "white",
                }}
              >
                <Link
                  className="no-underline text-black hover:bg-slate-700"
                  href={item["rPath"]}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: pathName === item["rPath"] ? "white" : "black",
                      }}
                    >
                      {item["icon"]}
                    </ListItemIcon>
                    <ListItemText
                      primary={item["name"]}
                      sx={{
                        opacity: open ? 1 : 0,
                        color: pathName === item["rPath"] ? "white" : "black",
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
            <ListItem
              onClick={async () => {
                const auth = getAuth();
                signOut(auth)
                  .then(() => {})
                  .catch((error) => {
                    // An error happened.
                  });
              }}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Logout />
                </ListItemIcon>
                <ListItemText
                  primary={"Logout"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </div>
    </Box>
  );
}
