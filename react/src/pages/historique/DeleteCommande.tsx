import React from "react";
import { Modal } from "react-bootstrap";
import { Button, Typography } from "@mui/material";
import Swal from "sweetalert2";
import DialogTitle from "@mui/material/DialogTitle";
import "./index.css"
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
  



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
    setlistcommande :Function ,
  showdelete: boolean;
  setShowdelete: Function;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteCommande({ showdelete,setlistcommande, setShowdelete, setIsUpdate }: variable) {
  const handleClose = () => setShowdelete(false);
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
  async function deleteUser() {
    try {
      await fetch(
        `http://localhost:7000/commande/${localStorage.getItem(
          "CommandeSelctedIdSuprimer"
        )}`,
        {
          method: "delete",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          Swal.fire({
            title: "La Commande a éte suprimmé ",
            icon: "success",
            confirmButtonText: "Ok",
                    }).then(function () {
            setIsUpdate(true);
            handleClose();
            getlistecommandes();
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
        <BootstrapDialog
        style={{ zIndex: 0 }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showdelete}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
         Supprimer 
        </BootstrapDialogTitle>
<DialogContent dividers style ={{width :"500px"}}>

<Typography variant="body1" color="initial">
 Voulez vous Supprimer Cette  Commande ?

</Typography>


</DialogContent>
 <DialogActions>
          <Button autoFocus onClick={deleteUser}  color="error" >
                 Supprimer
          </Button>
        </DialogActions>
</BootstrapDialog>
    </div>
  );
}

export default DeleteCommande;
