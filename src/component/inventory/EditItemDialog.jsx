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
  console.log(checked2);
  const onSubmit = (data) => {
    AddNewProductData(data);
  };
  console.log(ITEM.category);
  const AddNewProductData = async (data) => {
    const checkName = PRODUCT_DATA.some((item) => item.name === data.name);
    const checkcategory = CATEGORYS.some(
      (item) => item["Name"] === data.category
    );
    // ERRO HANDLE

    if (checked) {
      if (checkcategory) {
        setError("category", {
          type: "manual",
          message: "Product name already exists",
        });
        setcategoryError("Product category already exists");
      }
    }
    // ERRO HANDLE

    if (checked) {
      if (!checkcategory) {
        const shopRef = doc(getFirestore(), "shop", USER_DATA["shop_id"]);
        const categoryOLD = CATEGORYS.find(
          (item) => item["Name"] === ITEM.category
        );

        await updateDoc(shopRef, {
          category: {
            ...SHOP_DATA["category"],
            [ITEM.category]: {
              Count: categoryOLD.Count - 1,
            },
          },
        })
          .then(() => {
            updateDoc(shopRef, {
              category: {
                ...SHOP_DATA["category"],
                [data.category]: {
                  Count: 1,
                },
              },
            });
          })

          .then(() => {
            const db = getDatabase();

            const updates = {};
            updates["/shop/" + USER_DATA["shop_id"] + "/" + ITEM["id"]] = data;

            update(ref(db), updates)
              .then(() => {
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
                setValue("");
              })
              .catch((err) => {
                dispatch(
                  openScackbar({
                    open: true,
                    type: "error",
                    msg: err.message,
                  })
                );
              });
          })
          .catch((err) => {
            dispatch(
              openScackbar({
                open: true,
                type: "error",
                msg: err.message,
              })
            );
          });
      }
    }
    if (checked2) {
      const shopRef = doc(getFirestore(), "shop", USER_DATA["shop_id"]);
      const category = CATEGORYS.find((item) => item["Name"] === data.category);
      const categoryOLD = CATEGORYS.find(
        (item) => item["Name"] === ITEM.category
      );
      console.log(categoryOLD);
      await updateDoc(shopRef, {
        category: {
          ...SHOP_DATA["category"],
          [ITEM.category]: {
            Count: categoryOLD.Count - 1,
          },
        },
      })
        .then(() => {
          updateDoc(shopRef, {
            category: {
              ...SHOP_DATA["category"],
              [data.category]: {
                Count: category.Count + 1,
              },
            },
          });
        })

        .then(() => {
          const db = getDatabase();

          const updates = {};
          updates["/shop/" + USER_DATA["shop_id"] + "/" + ITEM["id"]] = data;

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
          setValue("");
        })
        .catch((err) => {
          dispatch(
            openScackbar({
              open: true,
              type: "error",
              msg: err.message,
            })
          );
        });
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
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={(e) => {
                      setChecked(e.target.checked);
                      setChecked2(false);
                      setValue("category", "");
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Create New Category"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={checked2}
                    onChange={(e) => {
                      setChecked2(e.target.checked);
                      setChecked(false);

                      setValue("category", "");
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Switch Category"
              />
              {checked ? (
                <div>
                  <TextField
                    fullWidth
                    sx={{ marginTop: "1em" }}
                    {...register("category")}
                    type="text"
                    id="outlined-basic"
                    label="Create category Name"
                    variant="outlined"
                    error={errors.category ? true : false}
                    helperText={errors.category && namecategoryError}
                  />
                </div>
              ) : checked2 ? (
                <Autocomplete
                  sx={{ marginTop: "1em" }}
                  fullWidth
                  disablePortal
                  id="combo-box-demo"
                  options={
                    SHOP_DATA["category"]
                      ? CATEGORYS.map((item) => item["Name"])
                      : []
                  }
                  onChange={selectcategory}
                  renderInput={(params) => (
                    <TextField
                      error={errors.category ? true : false}
                      helperText={errors.category && errors.category.message}
                      {...params}
                      label="Change Category"
                    />
                  )}
                />
              ) : (
                <></>
              )}
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
