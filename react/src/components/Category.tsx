import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  Box,
  Button,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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
import { Label } from "reactstrap";
import ModifierCategory from "./ModifierCategory";

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
  showcategory: boolean;
  setShowcategory: Function;
  setIsUpdateCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

function Category({
  setShowcategory,
  showcategory,
  setIsUpdateCategory,
}: variable) {
  const [listcategory, setlistcategory] = useState([]);
  const [showcategorymodifer, setShowcategorymodifier] = useState(false);

  const [CategorySelcted, setCategorySelcted] = useState();
  const [isUpdateCategoryModifier, setIsUpdateCategoryModifier] =
    useState<boolean>(false);

  const [nom, setnom] = useState("");

  const handleClose = () => {
    setShowcategory(false);
    setnom("");
  };

  async function getlistecategory() {
    try {
      await fetch(
         `http://localhost:7000/category/${localStorage.getItem("userid")}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          setlistcategory(data);
          console.log(listcategory);
        });
    } catch (error) {
      console.log("error");
    }
  }
  function AjouterCategory() {
    if (nom) {
      fetch("http://localhost:7000/category", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: nom,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsUpdateCategory(true);
          Swal.fire({
            title: "Une nouveau Catégorie a été ajouté",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(function () {
            // handleClose();
            setnom("");
            getlistecategory();
          });
        });
    } else {
      Swal.fire({
        title: "Il est obligatoire de remplir le champ de nom  !",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  }

  useEffect(() => {
    getlistecategory();
  }, []);
  async function deleteCategory() {
    try {
      await fetch(
        `http://localhost:7000/category/${localStorage.getItem("iddelete")}`,
        {
          method: "delete",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          Swal.fire({
            title: "La Catégorie  a été supprimé !",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(function () {
            setIsUpdateCategory(true);
            // handleClose();
            getlistecategory();
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
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
        <div>
          <BootstrapDialog
            style={{ zIndex: 0 }}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={showcategory}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              Ajouter Une Catégorie
            </BootstrapDialogTitle>
            <DialogContent dividers style={{ width: "500px" }}>
              <Box component="form" autoComplete="off">
                <TextField
                  style={{ width: "370px" }}
                  sx={{ mb: 1 }}
                  id="outlined-nom-input"
                  label="Nom Catégorie"
                  type="text"
                  value={nom}
                  onChange={(e: any) => {
                    setnom(e.target.value);
                  }}
                />
              </Box>

              {listcategory.length === 0 ? (
                <Typography sx={{ mt: "10px", mb: "15px" }}>
            Aucune Catégorie Encore Créé
                </Typography>
              ) : (
                <div>
                  <Typography sx={{ mt: "10px", mb: "15px" }}>
                    Listes Des Catégories Disponible:
                  </Typography>

                  {listcategory?.map((category: any, index: any) => (
                    <Stack direction={"row"} key={index}>
                      <TextField
                        sx={{ width: "500px", marginTop: "20px" }}
                        id="outlined-read-only-input"
                        label="Nom Catégorie"
                        defaultValue="Nom Catégorie"
                        value={category.nom}
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <Button
                        onClick={() => {
                          localStorage.setItem("Idput", category.category_id);
                          localStorage.setItem("Nomput", category.nom);

                          setShowcategorymodifier(true);

                          setCategorySelcted(category);
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() => {
                          localStorage.setItem(
                            "iddelete",
                            category.category_id
                          );

                          deleteCategory();
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Stack>
                  ))}
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={AjouterCategory}>
                Ajouter
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
        <ModifierCategory
          {...{
            setCategorySelcted,
            setlistcategory,
            CategorySelcted,
            setShowcategorymodifier,
            showcategorymodifer,
            setIsUpdateCategoryModifier,
          }}
        />
      </div>
    </div>
  );
}

export default Category;
