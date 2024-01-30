import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, Stack, TextField, Typography } from "@mui/material";
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
import ModifierType from "./ModifierType";

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
  showType: boolean;
  setShowType: Function;
  setIsUpdateType: React.Dispatch<React.SetStateAction<boolean>>;
};

function Type({ setShowType, showType, setIsUpdateType }: variable) {
  const [nom, setnom] = useState("");
  const handleClose = () => {
    setShowType(false);
    setnom("");
  };
  const [isUpdateCategoryType, setIsUpdateCategoryType] =
    useState<boolean>(false);
  const [listtype, setlisttype] = useState([]);
  const [showtypemodifer, setShowtypemodifier] = useState(false);

  const [TypeSelcted, setTypeSelcted] = useState();
  async function deleteType() {
    try {
      await fetch(
        // `http://localhost:7000/typeproduit/${localStorage.getItem(
        //   "idTypedelete"
        // )}`,
           `http://localhost:7000/stockageticket/${localStorage.getItem(
          "idTypedelete"
        )}`,
        {
          method: "delete",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          Swal.fire({
            title: "Le Type  a été supprimé !",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(function () {
            // setnom('')
            setIsUpdateType(true);

            // handleClose();
            getlisteType();
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
   async function deleteCarte() {
    try {
      await fetch(
           `http://localhost:7000/stockagecarte/${localStorage.getItem(
          "idTypedelete"
        )}`,
        {
          method: "delete",
        }
      )
        .then((response) => response.json())
        .then((data) => {
        
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function getlisteType() {
    try {
      // await fetch(   `http://localhost:7000/typeproduit/${localStorage.getItem("userid")}`, {
      await fetch(   `http://localhost:7000/stockageticket/${localStorage.getItem("userid")}`, {
 
      method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          setlisttype(data);
          console.log(listtype);
        });
    } catch (error) {
      console.log("error");
    }
  }

  function AjouterTypet() {
    if (nom) {
      // fetch("http://localhost:7000/typeproduit", {
      fetch("http://localhost:7000/stockageticket", {

        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // nom: nom,
          type :nom ,
          qantite : 0 ,
          master_id: localStorage.getItem("userid"),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsUpdateType(true);
          setnom("");
          Swal.fire({
            title: "Un nouveau Type a été ajouté",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(function () {
            getlisteType();
            // handleClose();
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
function AjouterTypeCarte() {
    if (nom) {
      // fetch("http://localhost:7000/typeproduit", {
      fetch("http://localhost:7000/stockagecarte", {

        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
         
          type :nom ,
          qantite : 0 ,
          master_id: localStorage.getItem("userid"),
        }),
      })
        .then((response) => response.json())
       
    }
    
  }
  useEffect(() => {
    getlisteType();
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
          open={showType}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Ajouter Un Type
          </BootstrapDialogTitle>
          <DialogContent dividers style={{ width: "500px" }}>
            <TextField
              style={{ width: "370px" }}
              sx={{ mb: 1 }}
              id="outlined-nom-input"
              label="Nom Type"
              type="text"
              value={nom}
              onChange={(e: any) => {
                setnom(e.target.value);
              }}
            />

            {listtype.length === 0 ? (
              <Typography sx={{ mt: "10px", mb: "15px" }}>
                Aucune Type n'était Déjà Créée
              </Typography>
            ) : (
              <Typography sx={{ mt: "10px", mb: "15px" }}>
                Listes Des Types Disponible:
              </Typography>
            )}

            {listtype?.map((type: any, index: any) => (
              <Stack direction={"row"} key={index}>
                <TextField
                  sx={{ width: "500px", marginTop: "20px" }}
                  id="outlined-read-only-input"
                  // label="Nom Type"
                  defaultValue="Nom Type"
                  value={type.type}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <Button
                  // style={{ marginBottom: "20px" }}
                  onClick={() => {
                    // localStorage.setItem("IdTypeput", type.typeproduit_id);
                    // localStorage.setItem("NomType", type.nom);
                      localStorage.setItem("IdTypeput", type.stockageticket_id);
                    localStorage.setItem("NomType", type.type);

                    setShowtypemodifier(true);
                    // setcategory(category);
                    setTypeSelcted(type);
                    // modfierCategory(CategorySelcted);
                  }}
                >
                  <EditIcon />
                </Button>
                <Button
                  // style={{ marginBottom: "15px" }}
                  onClick={() => {
                    // localStorage.setItem("idTypedelete", type.typeproduit_id);
                    localStorage.setItem("idTypedelete", type.stockageticket_id);

                    deleteType();
                    deleteCarte();
                  }}
                >
                  <DeleteIcon />
                </Button>
              </Stack>
            ))}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={
              
              () => {
                AjouterTypeCarte();
                AjouterTypet()
              }
              
              }>
              Ajouter
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
      <ModifierType
        {...{
          setTypeSelcted,
          setlisttype,
          TypeSelcted,
          setShowtypemodifier,
          showtypemodifer,
          setIsUpdateCategoryType,
        }}
      />
    </div>
  );
}

export default Type;
