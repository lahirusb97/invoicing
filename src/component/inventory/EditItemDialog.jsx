"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Autocomplete,
  FormControlLabel,
  FormHelperText,
  Switch,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import * as yup from "yup";
import { child, getDatabase, push, ref, update } from "firebase/database";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getFirestore,
  increment,
  updateDoc,
} from "firebase/firestore";
import { openScackbar } from "@/redux/Slice/SnackBarSlice";
import { editDialog } from "@/redux/Slice/editOpenSlice";

export default function EditItemDialog() {
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [nameError, setNameError] = React.useState("Enter Item Name");
  const [namecategoryError, setcategoryError] = React.useState(
    "Enter product category"
  );
  //USE SELECTORS
  const SHOP_DATA = useSelector((state) => state.shop_data.SHOP_DATA);
  const PRODUCT_DATA = useSelector((state) => state.product_data.PRODUCT_DATA);
  const CATEGORYS = useSelector((state) => state.shop_data.CATEGORYS);
  const USER_DATA = useSelector((state) => state.user_data.USER_DATA);
  const open = useSelector((state) => state.edit_open.OPEN);
  const ITEM = useSelector((state) => state.edit_open.ITEM);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  //USE SELECTORS
  const dispatch = useDispatch();
  const schema = yup.object({
    name: yup
      .string()
      .transform((value) => value.toLowerCase())
      .required("Enter Product Name"),
    price: yup.number().required("Enter Price"),
    cost: yup.number().required("Enter Cost"),
    stock: yup.number().required("Enter Stock Quantity"),
    alert: yup.number().required("Enter Item Count"),
    modal: yup.string(),
    warenty: yup.string().required("Enter Item Warranty"),
    category: yup
      .string()
      .required("select category")
      .transform((value) => value.toLowerCase()),
  });
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,

    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const selectcategory = (event, value) => {
    setValue("category", value);
  };
  React.useEffect(() => {
    if (open) {
      setValue("name", ITEM.name);
      setValue("price", ITEM.price);
      setValue("cost", ITEM.cost);
      setValue("stock", ITEM.stock);
      setValue("alert", ITEM.alert);
      setValue("modal", ITEM.modal);
      setValue("warenty", ITEM.warenty);
      setValue("category", ITEM.category);
    }
  }, [open]);

  const handleClose = () => {
    dispatch(editDialog(false));
    reset({
      name: "", // set specific values if needed
      price: "",
      cost: "",
      stock: "",
      alert: 0,
      modal: "",
      warenty: "",
      category: "",
    });
  };

  const onSubmit = (data) => {
    AddNewProductData(data);
  };

  const AddNewProductData = async (data) => {
    const checkName = PRODUCT_DATA.filter((item) => item.name === ITEM.name);
    console.log(checkName.length);

    if (checkName.length === 1) {
      //UPDATE
      const db = getDatabase();
      const newPostKey = push(
        child(ref(db), "shop/" + USER_DATA["shop_id"])
      ).key;
      const postData = { ...data, id: ITEM["id"] };

      const updates = {};
      updates["/shop/" + USER_DATA["shop_id"] + "/" + ITEM["id"]] = postData;
      update(ref(db), updates).then(() => {
        dispatch(
          openScackbar({
            open: true,
            type: "success",
            msg: `New Product Added `,
          })
        );
        reset({
          name: "", // set specific values if needed
          price: "",
          cost: "",
          stock: "",
          alert: 0,
          modal: "",
          warenty: "",
          category: "",
        });
      });
    }
    if (checkName.length > 1) {
      setError("name", {
        type: "manual",
        message: "Product name already exists",
      });
      setNameError("Product name already exists");
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add new Item"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div
              style={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
              }}
            >
              <TextField
                fullWidth
                sx={{
                  marginTop: "1em",
                  marginRight: isSmallScreen ? "0" : "1em",
                }}
                {...register("name")}
                type="text"
                id="outlined-basic"
                label="Item Name"
                variant="outlined"
                error={errors.name ? true : false}
                helperText={errors.name && nameError}
              />
              <TextField
                fullWidth
                sx={{ marginTop: "1em" }}
                {...register("price")}
                type="number"
                id="outlined-basic"
                label="Price"
                variant="outlined"
                error={errors.price ? true : false}
                helperText={errors.price && "Enter Item Price"}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
              }}
            >
              <TextField
                fullWidth
                sx={{
                  marginTop: "1em",
                  marginRight: isSmallScreen ? "0" : "1em",
                }}
                {...register("cost")}
                type="number"
                id="outlined-basic"
                label="cost"
                variant="outlined"
                error={errors.cost ? true : false}
                helperText={errors.cost && "Enter Item Cost"}
              />
              <TextField
                fullWidth
                sx={{ marginTop: "1em" }}
                {...register("stock")}
                type="number"
                id="outlined-basic"
                label="stock"
                variant="outlined"
                error={errors.stock ? true : false}
                helperText={errors.stock && "Enter Item Quantity"}
              />
            </div>

            <TextField
              sx={{ marginTop: "1em" }}
              {...register("alert")}
              id="outlined-basic"
              label="Alert Limit"
              variant="outlined"
              type="number"
              error={errors.alert ? true : false}
              helperText={errors.alert && "Enter Item Alert limit"}
            />
            <TextField
              sx={{ marginTop: "1em" }}
              {...register("modal")}
              id="outlined-basic"
              type="text"
              label="Modal"
              variant="outlined"
              error={errors.modal ? true : false}
              helperText={errors.alert && "Enter Item modal"}
            />
            <TextField
              sx={{ marginTop: "1em" }}
              {...register("warenty")}
              id="outlined-basic"
              type="text"
              label="Warenty"
              variant="outlined"
              error={errors.warenty ? true : false}
              helperText={errors.warenty && "Enter Item Warenty"}
            />
            <Button sx={{ marginTop: "1em" }} type="submit" variant="contained">
              Add Items
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
