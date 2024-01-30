import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import DialogTitle from "@mui/material/DialogTitle";
// import "./index.css";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
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
  setselectedCommande: Function;
  selectedCommande: any;
  setlistcommande: Function;
  showmodifier: boolean;
  setShowmodifier: Function;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModifierCommande({
  setselectedCommande,
  showmodifier,
  setlistcommande,
  selectedCommande,
  setShowmodifier,
  setIsUpdate,
}: variable) {
  const handleClose = () => setShowmodifier(false);
  const [Commande, setCommande] = useState(selectedCommande);

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
  async function modifierCommande() {
    await fetch(
      `http://localhost:7000/commandeput/${selectedCommande.commande_id}`,
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedCommande),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data " + data);
        setIsUpdate(true);
      });

    if (
      selectedCommande.qantite !== Commande.qantite ||
      selectedCommande.prixunitaire !== Commande.prixunitaire
    ) {
      // console.log('nombotiquejedid' + Boutique.nom);
      // console.log('nomboutiquegedim' + selectedBoutique.nom);
      // console.log('imggedima' + selectedBoutique.img);
      // console.log('imgjedida' + Boutique.img);
      Swal.fire({
        title: "Commande modifé!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      handleClose();
    } else {
      Swal.fire({
        title: "Il est obligatoire de modifier au moins un champs!",
        icon: "warning",
        confirmButtonText: "OK",
      });
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
      <BootstrapDialog
        style={{ zIndex: 0 }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showmodifier}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Modifier
        </BootstrapDialogTitle>
        <DialogContent dividers style={{ width: "500px" }}>
          <form>
            <div className="bd-highlight">
              <FormGroup>
                <div>
                  <TextField
                    id="outlined-number"
                    label="Quantite"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={selectedCommande?.qantite}
                    onChange={(event: any) => {
                      setselectedCommande({
                        ...selectedCommande,
                        qantite: event.target.value,
                      });
                    }}
                  />
                </div>
                {/* <Label
                className="box1"
                for="exampleNom"
                style={{ color: '#070f1b' }}
              >
            Quantite 
              </Label> */}
                <div>
                  <TextField
                    id="outlined-number"
                    label="Prix Unitaire"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={selectedCommande?.prixunitaire}
                    onChange={(event: any) => {
                      setselectedCommande({
                        ...selectedCommande,
                        prixunitaire: event.target.value,
                      });
                    }}
                  />
                </div>
                {/* <Input
                className="box"
                id="exampleNom"
                name="  Quantite "
                placeholder="  Quantite "
                
              />
                  <Label
                className="box1"
                for="Prix Unitaire"
                style={{ color: '#070f1b' }}
              >
              Prix Unitaire
              </Label>
              <Input
                className="box"
                id="Prix Unitaire"
                name="Prix Unitaire"
                placeholder="Prix Unitaire"
             
              /> */}
              </FormGroup>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={modifierCommande} color="success">
            Modifier
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default ModifierCommande;
