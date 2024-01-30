import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import DialogTitle from "@mui/material/DialogTitle";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormGroup, Input, Label } from "reactstrap";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

type variable = {
  setCategorySelcted: Function;
  setlistcategory: Function;
  CategorySelcted: any;
  showcategorymodifer: boolean;
  setShowcategorymodifier: Function;
  setIsUpdateCategoryModifier: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModifierCategory({
  setCategorySelcted,
  setlistcategory,
  CategorySelcted,
  setShowcategorymodifier,
  showcategorymodifer,
  setIsUpdateCategoryModifier,
}: variable) {
  //   const [listcategory, setlistcategory] = useState([]);
  const [Category, setCategory] = useState<any>(CategorySelcted);
  //  const [NomCategoty, setNomCategoty] = useState();
  //    const [NomCategoty1, setNomCategoty1] = useState(
  //   JSON.parse(JSON.stringify(localStorage.getItem('Nomput')))
  // );
  let nnn = localStorage.getItem("Nomput");
  console.log(nnn);

  const handleClose = () => {
    setShowcategorymodifier(false);
  };

  async function getlistecommandes() {
    try {
      await fetch("http://localhost:7000/category", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setlistcategory(data);
          setlistcategory(data);
          //   console.log(listcategory);
          console.log(Category);
        });
    } catch (error) {
      console.log("error");
    }
  }
  const a = (localStorage.getItem("Idput"));
  console.log(a);
  console.log(localStorage.getItem("Nomput"));
  console.log(CategorySelcted);
  async function modfierCategory() {
    if (CategorySelcted?.nom !== localStorage.getItem("Nomput")) {
      await fetch(`http://localhost:7000/categoryput/${a}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ CategorySelcted }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCategory(CategorySelcted);
          getlistecommandes();
          setIsUpdateCategoryModifier(true);

          handleClose();
        });
      Swal.fire({
        title: "Le type  a été modifié !",
        icon: "success",
        confirmButtonText: "Ok",
      });
      handleClose();
    } else {
      Swal.fire({
        title: "Il est obligatoire de faire   une modification au moins!",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  }

  useEffect(() => {
    getlistecommandes();
    setCategory(CategorySelcted);
  }, []);
  function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  return (
    <div>
      <div>
        <BootstrapDialog
          style={{ zIndex: 0 }}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={showcategorymodifer}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Modifier
          </BootstrapDialogTitle>
          <DialogContent dividers style={{ width: "300px" }}>
            <Box component="form" autoComplete="off">
              <TextField
                sx={{ my: 1 }}
                id="outlined-password-input"
                label="Nom Catégorie"
                type="text"
                value={CategorySelcted?.nom}
                onChange={(e: any) => {
                  setCategorySelcted(e.target.value);
                  // setCategory(e.target.value)
                }}
              ></TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={modfierCategory} color="success">
              Modifier
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </div>
  );
}

export default ModifierCategory;
