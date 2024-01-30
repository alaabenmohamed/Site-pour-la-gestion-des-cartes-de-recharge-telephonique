import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, Stack, Typography } from "@mui/material";
import Swal from "sweetalert2";
import DialogTitle from "@mui/material/DialogTitle";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Type from "./Type";
import Category from "./Category";
  



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
  
  showsetting: boolean;
  setShowsetting: Function;
   setIsUpdateSetting: React.Dispatch<React.SetStateAction<boolean>>;
};

function Setting({ setShowsetting ,showsetting,setIsUpdateSetting }: variable) {
  const handleClose = () => setShowsetting(false);
 const [showType, setShowType] = useState(false);
 const [showcategory,setShowcategory] = useState(false);
  const [isUpdateType, setIsUpdateType] = useState<boolean>(false);
  const [isUpdateCategory, setIsUpdateCategory] = useState<boolean>(false);


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
        open={showsetting}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
         Ajouter
        </BootstrapDialogTitle>
<DialogContent dividers style ={{width :"500px"}}>

{/* <Stack  direction={"row"} style={{marginTop:"10px", marginBottom:"10px"}}>
    <Typography variant="body1" color="initial" flexGrow={1}>
     Voulez vous Ajouter une Catégorie ?
    
    </Typography>
    <Button variant="contained" onClick={() => {
      setShowcategory(true)
    }
    }>Click Ici</Button>
</Stack> */}
<Stack  direction={"row"}>
    <Typography variant="body1" color="initial" flexGrow={1}>
     Voulez vous Ajouter un Type ?
    
    </Typography>
    <Button variant="contained"  onClick={() => {
      setShowType(true)
    }
    }>Click Ici</Button>
</Stack>

</DialogContent>

</BootstrapDialog>
    </div>
  <Type {...{showType,setShowType,setIsUpdateType}}  />
  <Category  {...{showcategory,setShowcategory,setIsUpdateCategory}} />
    </div>
  );
}

export default Setting;
