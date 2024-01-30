import { Box, Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import AddClient from "./AddClient";
import { useNavigate } from "react-router-dom";
import ModifierClient from "./ModifierClient";
import Swal from "sweetalert2";
function Client() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showclient, setShowClient] = useState(false);
  const [ClientSelcted, setClientSelcted] = useState();
  const [LigneClient, setLigneClient] = useState([]);

  const [showadd, setShowadd] = useState(false);
  const [IsUpdateClientModifier, setIsUpdateClientModifier] =
    useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [listclient, setlistclient] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
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
        });
    } catch (error) {
      console.log("error");
    }
  }
    async function deleteUser(client:any) {
    try {
      await fetch(
        `http://localhost:7000/client/${client.client_id}`,
        {
          method: "delete",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          Swal.fire({
            title: "Le client  a éte suprimmé ",
            icon: "success",
            confirmButtonText: "Ok",
                    }).then(function () {
            // setIsUpdate(true);
            // handleClose();
            getlisteclients();
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getlisteclients();
    console.log(localStorage.getItem("userid"));
  }, []);
  return (
    <div>
      <div>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Header
            //   isDashboard={true}
            title={"Client"}
            subTitle={"Welcome to your dashboard"}
          />

          <Box sx={{ textAlign: "right", mb: 1.3 }}>
            <Button
              sx={{ padding: "6px 8px", textTransform: "capitalize" }}
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Ajouter un Client
            </Button>
          </Box>
        </Stack>
      </div>

      <div>
      
          {listclient.length === 0 ? (
              <Paper>
            <Typography
              color={theme.palette.secondary.main}
              fontWeight={"bold"}
              p={1.2}
              variant="h6"
            >
              Ajouter Des Client a Votre Liste
            </Typography>
            </Paper>
          ) : (
            <div>
              <Paper>
            <Typography
              color={theme.palette.secondary.main}
              fontWeight={"bold"}
              p={1.2}
              variant="h6"
            >
              Votre Liste Des Clients
            </Typography>
       
        </Paper>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Numero</th>
              <th scope="col">Adresse</th>
              <th scope="col">Prix Unitaire Carte</th>
              <th scope="col">Prix Unitaire Ticket</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listclient.map((client: any) => (
              <tr key={client.client_id}>
                <td>{client.nom}</td>
                <td>{client.num}</td>
                <td>{client.adres}</td>
                <td>{client.prixunitairecarte}</td>
                <td>{client.prixunitaireticket}</td>

                <td>
                  <Button
                    sx={{ padding: "6px 8px", textTransform: "capitalize" }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      navigate("/historique");
                      localStorage.setItem(
                        "idClientCommande",
                        client.client_id
                      );
                      localStorage.setItem("NomClient", client.nom);
                      localStorage.setItem("AdressClient", client.adres);
                      localStorage.setItem("prixunitairecarte",client.prixunitairecarte);
                      localStorage.setItem("prixunitaireticket",client.prixunitaireticket)
                    }}
                  >
                    Voir Les Commandes
                  </Button>
                </td>
                <td>
                  <Button
                    sx={{ padding: "6px 8px", textTransform: "capitalize" }}
                    variant="contained"
                    color="success"
                    onClick={() => {
                      localStorage.setItem(
                        "idclientselected",
                        client.client_id
                      );
                      localStorage.setItem("NomClientmodifier", client.nom);
                      localStorage.setItem("num", client.num);
                      localStorage.setItem("adres", client.adres);
                      localStorage.setItem(
                        "prixunitairecarte",
                        client.prixunitairecarte
                      );
                      localStorage.setItem(
                        "prixunitaireticket",
                        client.prixunitaireticket
                      );
   localStorage.setItem("idmaster",client.master_id)
                      setShowClient(true);
                      setClientSelcted(client);
                     
                    }}
                  >
                    Modifier
                  </Button>
                </td>
                 <td>
                  <Button
                    sx={{ padding: "6px 8px", textTransform: "capitalize" }}
                    variant="contained"
                    color="error"
                 onClick={() => {
                  deleteUser(client)
                   
                 }
                 }
                  >
                   Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
          )
             }
      </div>
      
      <AddClient
        {...{ open, setOpen, setlistclient }}
        show={showadd}
        setShow={setShowadd}
        setIsUpdate={setIsUpdate}
      />
      <ModifierClient
        {...{
          setlistclient,
          setIsUpdateClientModifier,
          setClientSelcted,
          setLigneClient,
          ClientSelcted,
          setShowClient,
          showclient,
        }}
      />
    </div>
  );
}

export default Client;
