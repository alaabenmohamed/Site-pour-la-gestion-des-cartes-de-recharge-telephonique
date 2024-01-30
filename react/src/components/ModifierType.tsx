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
  setTypeSelcted: Function;
  setlisttype: Function;
  TypeSelcted: any;
  showtypemodifer: boolean;
  setShowtypemodifier: Function;
  setIsUpdateCategoryType: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModifierType({
  setTypeSelcted,
  setlisttype,
  TypeSelcted,
  setShowtypemodifier,
  showtypemodifer,
  setIsUpdateCategoryType,
}: variable) {
  //   const [listcategory, setlistcategory] = useState([]);
  const [Category, setCategory] = useState<any>(TypeSelcted);

  const handleClose = () => {
    setShowtypemodifier(false);
  };

  async function getlisteTypes() {
    try {
      await fetch(
        // "http://localhost:7000/typeproduit"
        `http://localhost:7000/stockageticket/${localStorage.getItem("userid")}`
        , {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setlisttype(data);

          //   console.log(listcategory);
          console.log(Category);
        });
    } catch (error) {
      console.log("error");
    }
  }
  const a = localStorage.getItem("IdTypeput");
  console.log(a);
  async function modfierCategory() {
    console.log(TypeSelcted);
    console.log(localStorage.getItem("NomType"));

    if (TypeSelcted?.type !== localStorage.getItem("NomType")) {
      // await fetch(`http://localhost:7000/typeproduitput/${a}`, {
      await fetch(`http://localhost:7000/stockageticketput/${a}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ TypeSelcted }),
      })
        .then((response) => response.json())
        .then((data) => {
          getlisteTypes();

          console.log(data);
          setCategory(TypeSelcted);
          setIsUpdateCategoryType(true);
          getlisteTypes();
          handleClose();
        });
      //  if (TypeSelcted?.nom !== localStorage.getItem("NomType")) {
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
    getlisteTypes();
    setCategory(TypeSelcted);
  }, []);
  console.log(TypeSelcted);
  console.log(Category);
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
  //   const handleChange = (event:any) => {
  //   setCategory(event.target.value);
  // };
  return (
    <div>
      <div>
        <BootstrapDialog
          style={{ zIndex: 0 }}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={showtypemodifer}
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
                // label="Nom Type"
                type="text"
                value={TypeSelcted?.type}
                onChange={(e: any) => {
                  setTypeSelcted(e.target.value);
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

export default ModifierType;
