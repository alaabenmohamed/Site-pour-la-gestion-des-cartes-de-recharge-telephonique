import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

function StatistiqueIndex() {
  const theme = useTheme();
  const [listcommande, setlistcommande] = useState<any>([]);
  const [listStockageCarte, setlistStockageCarte] = useState([]);
  const [listStockageTikcet, setlistStockageTikcet] = useState([]);
  const [listprixpayant, setlistprixpayant] = useState<any>([]);

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
  let sommePrix = 0;

  for (let i = 0; i < listcommande.length; i++) {
    sommePrix += listcommande[i].prixunitaire * listcommande[i].qantite;
  }

  // console.log(sommePrix);
  let sommePrixPayant = 0;

  for (let i = 0; i < listprixpayant.length; i++) {
    sommePrixPayant += listprixpayant[i].prixpayant;
  }
  //  for (let i = 0; i < listStockageTikcet.length; i++) {
  //   let listStockageTikcet.type = 0 ;
  // }
  let dataTicket: any = [];
  let dataCarte: any = [];

  async function getlistecommandes() {
    try {
      await fetch(`http://localhost:7000/commande/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setlistcommande(data);
        });
    } catch (error) {
      console.log("error");
    }
  }
  async function getlistePrixPayyant() {
    try {
      await fetch(`http://localhost:7000/payant/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setlistprixpayant(data);
        });
    } catch (error) {
      console.log("error");
    }
  }
  useEffect(() => {
    getlisteStockageTicket();
    getlisteStockageCarte();
    getlistecommandes();
    getlistePrixPayyant();
  }, []);
  useEffect(() => {
    for (let i = 0; i < listcommande.length; i++) {
      if (listcommande[i].categorie === "Ticket") {
        dataTicket.push(listcommande[i]);
      }
    }
    console.log(dataTicket);

    for (let i = 0; i < listcommande.length; i++) {
      if (listcommande[i].categorie === "Carte") {
        dataCarte.push(listcommande[i]);
      }
    }
    console.log(dataCarte);
  }, []);
  console.log(listStockageTikcet);
  console.log(dataCarte);
  interface Commande {
    commande_id: number;
    categorie: string;
    typ: string;
    qantite: number;
    prixunitaire: number;
    client_id: number;
  }
  const groupedData: { [key: string]: Commande } = {};
  listcommande.forEach((item: any) => {
    const key = `${item.categorie} ${item.typ}`;
    if (!groupedData[key]) {
      groupedData[key] = { ...item };
    } else {
      groupedData[key].qantite += item.qantite;
    }
  });

  const result = Object.values(groupedData);

  return (
    <div>
      <div>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Header
            title={"Statistique"}
            subTitle={"Welcome to your dashboard"}
          />
        </Stack>
      </div>
      <div>
        <Stack
          //   key={index}
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
            <Stack direction={"column"} gap={1}>
              <Typography
                variant="body2"
                sx={{ fontSize: "28px", color: theme.palette.secondary.main }}
              >
                Actuelle Stockage Carte :
              </Typography>
              {listStockageCarte.length === 0 ? (
                <Typography>
                  Aucune Type Encore Seléctionne (Vous pouvez ajouter des types
                  grâce à la configuration des boutons dans l'AppBar)
                </Typography>
              ) : (
                <div>
                  <Stack direction={"row"} gap={25} justifyContent={"center"}>
                    {listStockageCarte.map((carte: any, index: any) => (
                      <div key={index}>
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{ fontSize: "28px" }}
                        >
                          {carte.type} : {carte.qantite}
                          {/* {carte.type === ticket.type ? carte.type : null}    {carte.type === ticket.type ? carte.qantite : null}  */}
                        </Typography>
                      </div>
                    ))}
                  </Stack>
                </div>
              )}
            </Stack>
          </Paper>
        </Stack>
      </div>
      <div>
        <Stack
          //   key={index}
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
            <Stack direction={"column"} gap={1}>
              <Typography
                variant="body2"
                sx={{ fontSize: "28px", color: theme.palette.secondary.main }}
              >
                Actuelle Stockage Ticket :
              </Typography>
              {listStockageTikcet.length === 0 ? (
                <Typography>
                  Aucune Type Encore Seléctionne (Vous pouvez ajouter des types
                  grâce à la configuration des boutons dans l'AppBar)
                </Typography>
              ) : (
                <div>
                  <Stack direction={"row"} gap={25} justifyContent={"center"}>
                    {listStockageTikcet.map((ticket: any, index: any) => (
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{ fontSize: "28px" }}
                      >
                        {ticket.type} : {ticket.qantite}
                      </Typography>
                    ))}
                  </Stack>
                </div>
              )}
            </Stack>
          </Paper>
        </Stack>
      </div>
      <div>
        <Stack
          //   key={index}
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
            <Stack direction={"row"} gap={30}>
              <Stack
                direction={"column"}
                gap={1}
                sx={{ borderRight: "2px solid red", paddingRight: "100px" }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: "28px", color: theme.palette.secondary.main }}
                >
                  Consomation (Argent) :
                </Typography>
                <div>
                  <Stack direction={"column"} gap={1} justifyContent={"center"}>
                    <Typography
                      // key={index}
                      variant="body2"
                      sx={{ fontSize: "28px" }}
                    >
                      Prix Totale des Tous les Commandes : {sommePrix}
                    </Typography>
                    <Typography
                      // key={index}
                      variant="body2"
                      sx={{ fontSize: "28px" }}
                    >
                      Prix Totale Payant : {sommePrixPayant}
                    </Typography>
                    <Typography
                      // key={index}
                      variant="body2"
                      sx={{ fontSize: "28px" }}
                    >
                      Prix Restant : {sommePrix - sommePrixPayant}
                    </Typography>
                  </Stack>
                </div>
              </Stack>

              <Stack direction={"column"} gap={1} sx={{ ml: "-70px" }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "28px",
                    color: theme.palette.secondary.main,
                  }}
                >
                  Consomation (Carte et Ticket) :
                </Typography>

{ result.length === 0? 

 <Typography >
      Aucune Commande Encore
    </Typography> 
    :
        <Stack direction={"column"} gap={1} justifyContent={"center"}>
                  {result.map((ticket: any, index: any) => (
                    <div>
                      {/* {listcommande
                            .filter((e: any) => e.categorie === "Carte")
                            .map((nbre: any, index: any) => ( */}
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{ fontSize: "28px" }}
                      >
                        Nombre de {ticket.categorie} {ticket.typ} :
                        {ticket.qantite}
                      </Typography>
                    </div>
                  ))}
                </Stack>
    }

            
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </div>
    </div>
  );
}

export default StatistiqueIndex;
