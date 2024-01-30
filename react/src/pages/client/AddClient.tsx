import React, { useState } from 'react'
import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
type variable = {
    open:any;
    setlistclient:Function;
    setOpen: Function;
  show: boolean;
  setShow: Function;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
function AddClient({ open,setOpen,show,setlistclient, setShow, setIsUpdate }: variable) {
    const handleShow = () => setShow(true);
  const [nom, setNom] = useState('');
  const [num, setNum] = useState('');
  const [adres, setAdres] = useState('');
  const [prixunitairecarte, setprixunitairecarte] = useState('');
  const [prixunitaireticket, setprixunitaireticket] = useState('');






//   const handleClose = () => {
//     setNom('');
//     setImage('');
//     setShow(false);
//   };
 const handleClose = () => {
    setOpen(false);
    setNom('');
   setNum('');
   setAdres('');
   setprixunitairecarte('');
    setprixunitaireticket('')
    // setShow(false);
  };
async function getlisteadmines() {
    try {
      await fetch("http://localhost:7000/client", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setlistclient(data);
        });
    } catch (error) {
      console.log("error");
    }
  }
  function addclient() {
    if (nom && num && adres && prixunitairecarte && prixunitaireticket) {
      fetch("http://localhost:7000/client", {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: nom,
          num: num,
          adres :adres ,
          prixunitairecarte : prixunitairecarte,
          prixunitaireticket :prixunitaireticket,
          master_id:localStorage.getItem("userid")
        })
      })
        .then((response) => response.json())
        .then((data) => {
          setIsUpdate(true);
          Swal.fire({
            title: 'Un nouveau Client a été ajouté',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(function () {
            handleClose();
            getlisteadmines();
          });
        });
    } else {
      Swal.fire({
        title: 'Il est obligatoire de remplir tous les champs !',
        icon: 'warning',
        confirmButtonText: 'OK'
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
            position: 'absolute',
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
      style={{zIndex:0}}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
         Ajouter Un Client
        </BootstrapDialogTitle>
        <DialogContent dividers>
         <Box className="d-flex flex-column bd-highlight ">
          <Box    component="form"   autoComplete="off">
            <TextField
              style={{ width: '370px' }}
              sx={{ mt: 2, mb: 1 }}
              id="outlined-nom-input"
              label="Nom"
              type="text"
              value={nom}
              onChange={(e: any) => {
                setNom(e.target.value);
              }}
            />
          </Box>
                <Box    component="form"   autoComplete="off">
            <TextField
              style={{ width: '370px' }}
              sx={{ mt: 1, mb: 1 }}
              id="outlined-nom-input"
              label="Numero"
              type="text"
              value={num}
              onChange={(e: any) => {
                setNum(e.target.value);
              }}
            />
          </Box>
                 <Box    component="form"   autoComplete="off">
            <TextField
              style={{ width: '370px' }}
              sx={{ mt: 1, mb: 1 }}
              id="outlined-nom-input"
              label="Adresse"
              type="text"
              value={adres}
              onChange={(e: any) => {
                setAdres(e.target.value);
              }}
            />
         </Box>
               <Box    component="form"   autoComplete="off">
            <TextField
              style={{ width: '370px' }}
              sx={{ mt: 1, mb: 1 }}
              id="outlined-nom-input"
              label="Prix Unitaire Carte" 
            type="number"
              value={prixunitairecarte}
              onChange={(e: any) => {
                setprixunitairecarte(e.target.value);
              }}
            />
         </Box>
              <Box    component="form"   autoComplete="off">
            <TextField
              style={{ width: '370px' }}
              sx={{ mt: 1, mb: 1 }}
              id="outlined-nom-input"
              label="Prix Unitaire Ticket"
                 type="number"
              value={prixunitaireticket}
              onChange={(e: any) => {
                setprixunitaireticket(e.target.value);
              }}
            />
         </Box>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus 
        //   onClick={handleClose}
          onClick={addclient}

          >
            Ajouter
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}

export default AddClient
