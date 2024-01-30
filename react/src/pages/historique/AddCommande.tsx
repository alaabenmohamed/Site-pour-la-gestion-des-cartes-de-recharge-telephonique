import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { SelectChangeEvent } from "@mui/material/Select";
// import Select from "react-select";
import { Select } from "@mui/material";
// import Select from "react-select";

import Swal from "sweetalert2";
import SelectCategory from "./SelectCategory";
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
  setlistcommande: Function;
  open: any;

  setOpen: Function;

  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};
function AddCommande({
  open,
  setOpen,
  setIsUpdate,
  setlistcommande,
}: variable) {

   const [categorySelct, setcategorySelct] = React.useState("");
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setcategorySelct(event.target.value);
  };
  const [typeSelect, settypeSelect] = React.useState("");
  const handleChangeType = (event: SelectChangeEvent) => {
    settypeSelect(event.target.value);
  };
  // const [category, setcategory] = useState<any>();
  // const [type, settype] = useState<any>();

  const [listeCategorySelection, setlisteCategorySelection] = useState<any>([]);
  const [listeTypeSelection, setlisteTypeSelection] = useState<any>([]);
  const [qantite, setqantite] = useState("");

  const [prixUnitaire, setprixUnitaire] = useState("");
  const [prixtotale, setprixtotale] = useState("");


  const nbreqantite = parseInt(qantite);
  const numprixUnitaire = parseInt(prixUnitaire);
  
  const Totale = nbreqantite * numprixUnitaire;

  
  const handleClose = () => {
    setOpen(false);
    setcategorySelct("");
    settypeSelect("");
     setqantite("");
    // setprixpayant("");
    setprixUnitaire("");
  };
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
  async function getlistecommandes() {
    try {
      await fetch(
        `http://localhost:7000/commande/${localStorage.getItem(
          "idClientCommande"
        )}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setlistcommande(data);
        });
    } catch (error) {
      console.log("error");
    }
  }

  function AjouterProduit() {
    if (categorySelct) {
      if (typeSelect) {
        if (qantite ) {
          fetch("http://localhost:7000/put", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              categorie: categorySelct,
              typ: typeSelect,
              qantite: qantite,
              prixunitaire: categorySelct === "Carte" ? localStorage.getItem("prixunitairecarte") :localStorage.getItem("prixunitaireticket"),
              // prixtotale: prixtotale,
              client_id: localStorage.getItem("idClientCommande"),
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              setIsUpdate(true);
              getlistecommandes();
              // setidBoutique(0);
              // setidFamille(0);
              Swal.fire({
                title: "Ue nouveau Commande a été ajouté",
                icon: "success",
                confirmButtonText: "Ok",
              }).then(function () {
                handleClose();
              });
            });
        } else {
          Swal.fire({
            title: "Il est obligatoire de remplir le champ de Quantite!",
            icon: "warning",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.fire({
          title: "Il est obligatoire de choisir un Type !",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    } else {
      Swal.fire({
        title: "Il est obligatoire de choisir une Category !",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  }
  // function getCategory() {
  //   fetch(   `http://localhost:7000/category/${localStorage.getItem("userid")}`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         let data: any = [];
  //         result.forEach((element: any, index: any) => {
  //           data.push({
  //             value: element.category_id,
  //             label: element.nom,
  //           });
  //         });

  //         setlisteCategorySelection(data);
  //         console.log(listeCategorySelection);
  //       },

  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }
  function getType() {
    fetch(
      //  `http://localhost:7000/typeproduit/${localStorage.getItem("userid")}`
       `http://localhost:7000/stockageticket/${localStorage.getItem("userid")}`

    , {
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let data: any = [];
          result.forEach((element: any, index: any) => {
            data.push({
              value: element.stockageticket_id,
              label: element.type,
            });
          });

          setlisteTypeSelection(data);
        },

        (error) => {
          console.log(error);
        }
      );
  }
  useEffect(() => {
    // getCategory();
    getType();
  }, []);
 
console.log(categorySelct);
console.log(typeSelect)
console.log(localStorage.getItem("prixunitairecarte"))
console.log( localStorage.getItem("prixunitaireticket"))
 
                     
  return (
    <div style={{ minWidth: "1000px" }}>
      <BootstrapDialog
        style={{ zIndex: 0 }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Ajouter Un Client
        </BootstrapDialogTitle>
        <DialogContent dividers style={{ minHeight: "200px" }}>
          <Stack direction={"row"}>
            <Box autoComplete="off" component="form">
              <div className=" bd-highlight ">
                <TextField
                  style={{ width: "150px" }}
                  sx={{ mb: 1 }}
                  id="outlined-nom-input"
                  label="Qantite"
                  type="text"
                  value={qantite}
                  onChange={(e: any) => {
                    setqantite(e.target.value);
                  }}
                />
              </div>
            </Box>
            <div
              style={{
                marginRight: "10px",
                marginLeft: "10px",
                width: "370px",
              }}
            >
              <FormControl sx={{  minWidth: "200px" }}>
                <InputLabel id="demo-simple-select-autowidth-label" style={{height :"50px"}}>
                  Sélectionnez une 
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={categorySelct}
                  onChange={handleChangeCategory}
                  autoWidth
                  label="Sélectionnez une Category"
                >
                  {/* {listeCategorySelection.map((category: any) => ( */}
                    <MenuItem value={"Carte"}>Carte</MenuItem>
                    <MenuItem value={"Ticket"}>Ticket</MenuItem>

              
                </Select>
              </FormControl>
            </div>
 <FormControl sx={{  minWidth: "150px" }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Sélectionnez un Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={typeSelect}
                  onChange={handleChangeType}
                  autoWidth
                  label="Sélectionnez un Type"
                >
                  {listeTypeSelection.map((type: any) => (
                    <MenuItem value={type.label}>{type.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            <div
              style={{
                marginRight: "10px",
                marginLeft: "10px",
                width: "370px",
              }}
            >
              {/* <Select
              
                options={listeTypeSelection}
                placeholder="Sélectionnez un Type"
              /> */}
            </div>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={AjouterProduit}>
            Ajouter
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default AddCommande;
