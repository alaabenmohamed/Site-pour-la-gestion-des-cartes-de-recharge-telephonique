import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import AddCommande from "./AddCommande";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactToPrint from "react-to-print";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import DeleteCommande from "./DeleteCommande";
import ModifierCommande from "./ModifierCommande";

import Swal from "sweetalert2";
function Historique() {
   
  const theme = useTheme();
  const [listprix, setlistprix] = useState<any>([]);
  const [prixpayant, setprixpayant] = useState(0);
  const [showdelete, setShowdelete] = useState(false);
  const [selectedCommande, setselectedCommande] = useState<any>();
  const [showmodifier, setShowmodifier] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [listcommande, setlistcommande] = useState<any>([]);
  let [long, setlong] = useState<any>();
  const handleClickOpen = () => {
    setOpen(true);
  };

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

 async function getlistePrixPayant() {
    try {
      await fetch(
        `http://localhost:7000/payant/${localStorage.getItem(
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
   setlistprix(data)
  //setprixpayant(data.prixpayant)
        });
    } catch (error) {
      console.log("error");
    }
  }


  function AddPrix() {
    fetch("http://localhost:7000/putpost", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prixpayant: prixpayant,
        client_id: localStorage.getItem("idClientCommande"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
          getlistePrixPayant();
        // setIsUpdate(true);
        // getlistecommandes();
        // setidBoutique(0);
        // setidFamille(0);
        Swal.fire({
          title: "Bien Enregistré",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(function () {
          // handleClose();
        });
      });
  }
  useEffect(() => {
    getlistePrixPayant();
    getlistecommandes();
    console.log("houni" + localStorage.getItem("idClientCommande"));
    console.log("houni" + localStorage.getItem("NomClient"));
    console.log("houni" + localStorage.getItem("AdressClient"));
  }, []);

  let sommePrix = 0;

  for (let i = 0; i < listcommande.length; i++) {
    sommePrix += listcommande[i].prixunitaire * listcommande[i].qantite;
  }

  // console.log(sommePrix);
  let sommePrixPayant = 0;

  for (let i = 0; i < listcommande.length; i++) {
    sommePrixPayant += listcommande[i].prixpayant;
  }
  // let sommePrixRestant = 0;

  // for (let i = 0; i < listcommande.length; i++) {
  //   sommePrixRestant += listcommande[i].prixrestant;
  // }

   let componentRef :any = useRef();
	class ComponentToPrint extends React.Component {
  render() {
    return (
      <div  ref={ref} >
        <h2 style ={{marginLeft : "350px", marginTop :"30px" , marginBottom :"30px" }}>Client :  {localStorage.getItem("NomClient") +
              " " +
              "(" +
              localStorage.getItem("AdressClient") +
              ")" }</h2>
            
        <MDBTable  >
                <MDBTableHead>
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Type</th>
                    <th scope="col">Quantite</th> 
                    <th scope="col">Prix Unitaire</th>
                   
                    <th scope="col"></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {listcommande.map((client: any) => (
                    <tr
                      key={client.client_id}
                      className={
                        "table-dark"
                      //   `${
                      //   client.prixpayant === client.prixtotale
                      //     ? "table-success"
                      //     : client.prixpayant === 0
                      //     ? "table-danger"
                      //     : "table-warning"
                      // }`
                    }
                    >
                      <td>{client.categorie}</td>
                      <td>{client.typ}</td>
        
                      <td>{client.qantite}</td> 
                      <td>{client.prixunitaire}</td>
                   
                    </tr>
                  ))}
                </MDBTableBody>
                <tfoot
                  className={`${
                   listprix[0]?.prixpayant === sommePrix
                      ? "table-success"
                      : listprix[0]?.prixpayant === 0
                      ? "table-danger"
                      : "table-warning"
                  }`}
                >
                  <tr>
                    <td colSpan={1}>Total :{sommePrix}</td>
                  </tr>
                  <tr>
                    <td colSpan={1}>Prix Payant : {listprix[0]?.prixpayant}</td>
                  </tr>
          
                  <tr>
                    <td colSpan={1}>Prix Restant Totale :{sommePrix-listprix[0]?.prixpayant}</td>
                  </tr>
                </tfoot>
              </MDBTable>
           
      </div>
    );
  }
}
	const ref:any = useRef();
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
            title={"Commande"}
            subTitle={
              "Ici Vous Trouve Liste De Commande de Votre Client " +
              localStorage.getItem("NomClient") +
              " " +
              "(" +
              localStorage.getItem("AdressClient") +
              ")"
            }
          />

          <Box sx={{ textAlign: "right", mb: 1.3 }}>
            <Button
              sx={{ padding: "6px 8px", textTransform: "capitalize" }}
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Ajouter une Commande
            </Button>
          </Box>
        </Stack>
      </div>
      <div>
        {listcommande.length === 0 ? (
          <Paper>
            <Typography
              color={theme.palette.secondary.main}
              fontWeight={"bold"}
              p={1.2}
              variant="h6"
            >
              Aucune Commande n'associe à Cette Client Encore
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
                Liste Des Commande de Cette Client{" "}
              </Typography>
            </Paper>
            <Stack direction={"row"} sx={{ my: "15px", mr: "10px" }} gap={1}>
              <Box flexGrow={1}></Box>
              <TextField
                id="outlined-number"
                label="Prix Payant"
                type="number"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                // value={listprix[0].prixpayant}
                onChange={(e: any) => {
                  setprixpayant(e.target.value);
                }}
              />
              <Button variant="contained" color="success"  onClick={AddPrix}>
                Confirmer
              </Button>
                {/* <Button variant="contained" color="secondary" 
                //  onClick={AddPrix}
                >
                Modifier
              </Button> */}
            </Stack>
          
         
       <MDBTable 	  >
                <MDBTableHead>
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Type</th>
                    <th scope="col">Quantite</th>
                    <th scope="col">Prix Unitaire</th>
                    {/* <th scope="col">Prix Payant</th> */}
                    {/* <th scope="col">Prix Totale</th> */}
                    {/* <th scope="col">Prix Restant</th> */}
                    {/* <th scope="col"></th> */}
                    <th scope="col"></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {listcommande.map((client: any) => (
                    <tr
                      key={client.client_id}
                      className={
                        "table-dark"
                      //   `${
                      //   client.prixpayant === client.prixtotale
                      //     ? "table-success"
                      //     : client.prixpayant === 0
                      //     ? "table-danger"
                      //     : "table-warning"
                      // }`
                    }
                    >
                      <td>{client.categorie}</td>
                      <td>{client.typ}</td>
         
                      <td>{client.qantite}</td>
                      <td>{client.prixunitaire}</td>
                      {/* <td>
                    <Button
                      sx={{ padding: "6px 8px", textTransform: "capitalize" }}
                      variant="contained"
                      // color="primary"
                      color="success"
                      onClick={() => {
                        setselectedCommande(client);
                       setShowmodifier(true);
                        localStorage.setItem("CommandeSelctedIdModifer",client.commande_id);
          
                      }}
                    >
                      Modifier
                    </Button>
                  </td> */}
                      <td>
                        <Button
                          sx={{ padding: "6px 8px", textTransform: "capitalize" }}
                          variant="contained"
                          color="error"
                          onClick={() => {
                            setShowdelete(true);
                            //  navigate("/historique")
                            localStorage.setItem(
                              "CommandeSelctedIdSuprimer",
                              client.commande_id
                            );
                          }}
                        >
                          Supprimer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
                <tfoot
                  className={`${
                   listprix[0]?.prixpayant === sommePrix
                      ? "table-success"
                      : listprix[0]?.prixpayant === 0
                      ? "table-danger"
                      : "table-warning"
                  }`}
                >
                  <tr>
                    <td colSpan={4}>Total :{sommePrix}</td>
                  </tr>
                  <tr>
                    <td colSpan={4}>Prix Payant : {listprix[0]?.prixpayant}</td>
                  </tr>
          
                  <tr>
                    <td colSpan={4}>Prix Restant Totale :{sommePrix-listprix[0]?.prixpayant}</td>
                  </tr>
                </tfoot>
              </MDBTable>
             
       <div>
        
        <ReactToPrint
          trigger={() => 
          <Button variant="contained">Print</Button>
          }
          content={() => componentRef}
        />

        <div style={{ display: "none" }}>
        <ComponentToPrint ref={(el) => (componentRef = el)} />
        </div>
      </div>
     
         
        
            	
          </div>
        )}
      </div>
      <AddCommande {...{ open, setOpen, setIsUpdate, setlistcommande }} />
      <DeleteCommande
        {...{ showdelete, setlistcommande, setShowdelete, setIsUpdate }}
      />
      <ModifierCommande
        {...{
          showmodifier,
          setlistcommande,
          setShowmodifier,
          setIsUpdate,
          setselectedCommande,
          selectedCommande,
        }}
      />
    </div>
  );
}

export default Historique;
