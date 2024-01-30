import React, { useEffect, useState } from "react";

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
    setlistclient: Function ,
  setClientSelcted: Function;
  setLigneClient: Function;
  ClientSelcted: any;
  showclient: boolean;
  setShowClient: Function;
  setIsUpdateClientModifier: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModifierClient({
    setlistclient,
  setClientSelcted,
  setLigneClient,
  ClientSelcted,
  setShowClient,
  showclient,
  setIsUpdateClientModifier,
}: variable) {
  const [Champs, setChamps] = useState<any>(ClientSelcted);
  // const [nom, setnom] = useState(ClientSelcted?.nom)
  // const [num, setnum] = useState(ClientSelcted?.num)
  // const [adres, setadres] = useState(ClientSelcted?.adres)
  // const [prixunitairecarte, setprixunitairecarte] = useState(ClientSelcted?.prixunitairecarte)
  // const [prixunitaireticket, setprixunitaireticket] = useState(ClientSelcted?.prixunitaireticket)

  const handleClose = () => {
    setShowClient(false);
  };
  async function getlisteclients() {
    try {
      await fetch(
        `http://localhost:7000/client/${localStorage.getItem("userid")}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setlistclient(data);
          //   setLigneClient(data);
          //   console.log(listcategory);
          console.log(Champs);
        });
    } catch (error) {
      console.log("error");
    }
  }
  const id = localStorage.getItem("idclientselected");

  console.log(localStorage.getItem("Nomput"));

  async function modfierCategory() {
    console.log("ClientSelcted", ClientSelcted);

    
    await fetch(`http://localhost:7000/clientput/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: ClientSelcted.nom,
        num: ClientSelcted.num,
        adres: ClientSelcted.adres,
        prixunitairecarte: ClientSelcted.prixunitairecarte,
        prixunitaireticket: ClientSelcted.prixunitaireticket,
        master_id: localStorage.getItem("idmaster"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChamps(ClientSelcted);
        getlisteclients();

        setIsUpdateClientModifier(true);

        handleClose();
      });
    //   if (
    //   ClientSelcted?.nom !== localStorage.getItem("NomClientmodifier") ||
    //   ClientSelcted?.num !== localStorage.getItem("num") ||
    //   ClientSelcted?.adres !== localStorage.getItem("adres")
    //     ||
    //     ClientSelcted?.prixunitairecarte !==
    //       localStorage.getItem("prixunitairecarte") ||
    //     ClientSelcted?.prixunitaireticket !==
    //       localStorage.getItem("prixunitaireticket")
    // ) {
    //   Swal.fire({
    //     title: "Bien modifié !",
    //     icon: "success",
    //     confirmButtonText: "Ok",
    //   });
    //   handleClose();
    // } else {
    //   Swal.fire({
    //     title: "Il est obligatoire de mofier  au moins un champs!",
    //     icon: "warning",
    //     confirmButtonText: "OK",
    //   });
    // }
  }

  useEffect(() => {
    getlisteclients();
    setChamps(ClientSelcted);
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
          open={showclient}
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
                type="text"
                value={ClientSelcted?.nom}
                onChange={(e: any) => {
                  let data = {
                    ...ClientSelcted,

                    nom: e.target.value,
                  };

                  setClientSelcted(data);
                }}
              />
              <TextField
                sx={{ my: 1 }}
                type="text"
                value={ClientSelcted?.num}
                onChange={(e: any) => {
                  let data = {
                    ...ClientSelcted,

                    num: e.target.value,
                  };

                  setClientSelcted(data);
                }}
              />
              <TextField
                sx={{ my: 1 }}
                type="text"
                value={ClientSelcted?.adres}
                onChange={(e: any) => {
                  let data = {
                    ...ClientSelcted,

                    adres: e.target.value,
                  };

                  setClientSelcted(data);
                }}
              />
              <TextField
                sx={{ my: 1 }}
                type="text"
                value={ClientSelcted?.prixunitairecarte}
                onChange={(e: any) => {
                  let data = {
                    ...ClientSelcted,

                    prixunitairecarte: e.target.value,
                  };

                  setClientSelcted(data);
                }}
              />
              <TextField
                sx={{ my: 1 }}
                type="text"
                value={ClientSelcted?.prixunitaireticket}
                onChange={(e: any) => {
                  let data = {
                    ...ClientSelcted,

                    prixunitaireticket: e.target.value,
                  };

                  setClientSelcted(data);
                }}
              />
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

export default ModifierClient;
