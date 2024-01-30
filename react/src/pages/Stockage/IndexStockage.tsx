import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import Header from "../../components/Header";
function IndexStockage() {
  const [nbrecarte, setnbrecarte] = useState(0);
  const [nbretikcet, setnbretikcet] = useState(0);

  const [nbrecarteMoins, setnbrecarteMoins] = useState(0);
  const [nbreticketMoins, setnbreticketMoins] = useState(0);

  const [nbrecarteAjoute, setnbrecarteAjoute] = useState(0);
  const [nbretikcetAjoute, setnbretikcetAjoute] = useState(0);

  const [listtype, setlisttype] = useState([]);
  const [listStockageCarte, setlistStockageCarte] = useState([]);
  const [listStockageTikcet, setlistStockageTikcet] = useState([]);

  const theme = useTheme();
  async function getlisteType() {
    try {
      await fetch(
        `http://localhost:7000/stockageticket/${localStorage.getItem("userid")}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
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
  async function getlisteStockageCarte() {
    try {
      await fetch(
        `http://localhost:7000/stockagecarte/${localStorage.getItem("userid")}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          setlistStockageCarte(data);
          console.log(listStockageCarte);
        });
    } catch (error) {
      console.log("error");
    }
  }
  async function getlisteStockageTicket() {
    try {
      await fetch(
        `http://localhost:7000/stockageticket/${localStorage.getItem(
          "userid"
        )}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          setlistStockageTikcet(data);
          console.log(listStockageTikcet);
        });
    } catch (error) {
      console.log("error");
    }
  }
  useEffect(() => {
    getlisteType();
    getlisteStockageCarte();
    getlisteStockageTicket();
  }, []);
  function AjouterNbreCarte() {
    fetch("http://localhost:7000/stockagecarte", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: localStorage.getItem("typeCarte"),
        qantite: nbrecarte,

        master_id: localStorage.getItem("userid"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getlisteType();
        getlisteStockageCarte();
        // setIsUpdate(true);
        // getlistecommandes();
        // setidBoutique(0);
        // setidFamille(0);
        Swal.fire({
          title: "Bien Enregistrer",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(function () {
          // handleClose();
        });
      });
  }

  function Plus() {
    fetch("http://localhost:7000/plus", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: localStorage.getItem("typeCartePlus"),

        qantite: nbrecarteAjoute,

        master_id: localStorage.getItem("userid"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getlisteType();
        getlisteStockageCarte();
        // setIsUpdate(true);
        // getlistecommandes();
        // setidBoutique(0);
        // setidFamille(0);
        Swal.fire({
          title: "Bien Enregistrer",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(function () {
          // handleClose();
        });
      });
  }
  function Moins() {
    fetch("http://localhost:7000/moins", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: localStorage.getItem("typeCarteMoins"),

        qantite: nbrecarteMoins,

        master_id: localStorage.getItem("userid"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getlisteType();
        getlisteStockageCarte();
        // setIsUpdate(true);
        // getlistecommandes();
        // setidBoutique(0);
        // setidFamille(0);
        Swal.fire({
          title: "Bien Enregistrer",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(function () {
          // handleClose();
        });
      });
  }
  function AjouterNbreTicket() {
    fetch("http://localhost:7000/stockageticket", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: localStorage.getItem("typeTicket"),
        qantite: nbretikcet,

        master_id: localStorage.getItem("userid"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getlisteType();
        getlisteStockageTicket();

        Swal.fire({
          title: "Bien Enregistrer",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(function () {
          // handleClose();
        });
      });
  }
  function PlusTicket() {
    fetch("http://localhost:7000/plusticket", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: localStorage.getItem("typeTicketPlus"),

        qantite: nbretikcetAjoute,

        master_id: localStorage.getItem("userid"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getlisteType();
        getlisteStockageTicket();
 
        Swal.fire({
          title: "Bien Enregistrer",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(function () {
          // handleClose();
        });
      });
  }
  function MoinsTicket() {
    fetch("http://localhost:7000/moinsticket", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: localStorage.getItem("typeTicketMoins"),

        qantite: nbreticketMoins,

        master_id: localStorage.getItem("userid"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getlisteType();
        getlisteStockageTicket();
      
        Swal.fire({
          title: "Bien Enregistrer",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(function () {
          // handleClose();
        });
      });
  }
  return (
    <div>
        <div   > 
           <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
       
            <Header
                  
            title={"Votre Stockage"}
            subTitle={"Welcome to your dashboard"}
          />
          </Stack>
     </div>

     <div>
      {listtype.length ===0  ?  
      
    <Typography >
      Aucune Type Encore  Seléctionne (Vous pouvez ajouter des types grâce à la configuration des boutons dans l'AppBar)
    </Typography>
    :
     <div>
       {listtype.map((type: any, index: any) => (
        <Stack
          key={index}
          sx={{ mt: "5px" }}
          direction={"row"}
          flexWrap={"wrap"}
          gap={1}
          justifyContent={{ xs: "center", sm: "space-between" }}
        >
          <Paper
            sx={{
              flexGrow: 1,
              minWidth: "333px",
              p: 1.5,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack gap={1}>
              <Typography
                variant="body2"
                sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
              >
                Nomber De Carte {type.type} Actuelle :
              </Typography>
              {listStockageCarte.map((carte: any, index: any) => (
                <Typography
                  variant="body2"
                  sx={{ fontSize: "18px" }}
                  key={index}
                >
               
                  {carte.type === type.type ? carte.qantite : null}
                </Typography>
              ))}
            </Stack>

            <Stack alignItems={"center"}>
              <Stack direction={"row"}>
                <TextField
                  id="outlined-number"
                  label="Nombre à Ajouter"
                  type="number"
                  sx={{ mr: "50px", mb: "6px" }}
                  onChange={(e: any) => {
                   
                    setnbrecarteAjoute(e.target.value);
                  }}
                />
                <Button
                  sx={{ mb: "5px" }}
                  variant="contained"
                  onClick={() => {
                    localStorage.setItem("typeCartePlus", type.type);
                    Plus();
                  }}
                >
                  <AddIcon />
                </Button>
              </Stack>
              <Stack direction={"row"}>
                <TextField
                  id="outlined-number"
                  label="Mise à Jour De Valeur"
                  type="number"
                  sx={{ mr: "5px" }}
                  onChange={(e: any) => {
                    setnbrecarte(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    localStorage.setItem("typeCarte", type.type);
                    AjouterNbreCarte();
                  }}
                >
                  Modiffier
                </Button>
              </Stack>
              <Stack direction={"row"}>
                <TextField
                  id="outlined-number"
                  label="Nombre à Soustracter"
                  type="number"
                  sx={{ mr: "50px", mt: "6px" }}
                  onChange={(e: any) => {
                    setnbrecarteMoins(e.target.value);
                  }}
                />
                <Button variant="contained" sx={{ mt: "5px" }} onClick={
                  
                  () => {
                    localStorage.setItem("typeCarteMoins",type.type)
                    Moins()
                  }
                  }>
                  <RemoveIcon />
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      ))}

      {listtype.map((type: any, index: any) => (
        <Stack
          key={index}
          sx={{ mt: "5px" }}
          direction={"row"}
          flexWrap={"wrap"}
          gap={1}
          justifyContent={{ xs: "center", sm: "space-between" }}
        >
          <Paper
            sx={{
              flexGrow: 1,
              minWidth: "333px",
              p: 1.5,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack gap={1}>
              <Typography
                variant="body2"
                sx={{ fontSize: "23px", color: "#ff3d00" }}
              >
                Nomber De Ticket {type.type} Actuelle :
              </Typography>
       
                <Typography
                  variant="body2"
                  sx={{ fontSize: "18px", mt: "20px" }}
                  key={index}
                >
                 {type.qantite}
                </Typography>
            
            </Stack>

            <Stack alignItems={"center"}>
              <Stack direction={"row"}>
                <TextField
                  id="outlined-number"
                  label="Nombre  a Ajouter"
                  type="number"
                  sx={{ mr: "50px", mb: "6px" }}
                  onChange={(e: any) => {
                    setnbretikcetAjoute(e.target.value);
                  }}
                />
                <Button
                  sx={{ mb: "5px" }}
                  variant="contained"
                  onClick={() => {
                  localStorage.setItem("typeTicketPlus",type.type)
                    PlusTicket();
                  }}
                >
                  <AddIcon />
                </Button>
              </Stack>
              <Stack direction={"row"}>
                <TextField
                  id="outlined-number"
                  label="Mise à Jour De Valeur"
                  type="number"
                  sx={{ mr: "5px" }}
                  onChange={(e: any) => {
                    setnbretikcet(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    localStorage.setItem("typeTicket", type.type);
                    AjouterNbreTicket();
                  }}
                >
                  Modiffier
                </Button>
              </Stack>
              <Stack direction={"row"}>
                <TextField
                  id="outlined-number"
                  label="Nombre à Soustracter"
                  type="number"
                  sx={{ mr: "50px", mt: "6px" }}
                  onChange={(e: any) => {
                    setnbreticketMoins(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  sx={{ mt: "5px" }}
                  onClick={() => {
                    localStorage.setItem("typeTicketMoins", type.type);
                    MoinsTicket();
                  }}
                >
                  <RemoveIcon />
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      ))}
     </div>
    }
    
     </div>

      
    </div>
  );
}

export default IndexStockage;
