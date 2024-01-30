/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Button, Container, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Input, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
 import "./css/all.min.css";
 import "./css/Normalize.css";
 import "./css/bootstrap.min.css";
  import "./css/style.css";
import React from "react";





type admintype = {
  setuser: Function;
};

function Register() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nom, setNom] = React.useState("");

  // const navigate = useNavigate();
  

  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function AddAdmine() {
    if (password && email && nom ) {
      if (re.test(email)) {
      console.log("a1")
        fetch("http://localhost:7000/master", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            mdp: password,
            nom: nom,    
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Votre compte est bien enregistré",
              showConfirmButton: false,
              timer: 2500,
            });
            localStorage.removeItem("register");
           // navigate("/");
            setTimeout(() => {
              window.location.reload();
            }, 2400);
          });
      } else {
        Swal.fire({
          title: " Cet email est invalide !",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        title: "Il est obligatoire de remplir tous les champs !",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  }


  return (
    <Box >
   
<div className="background">
    <div className="container"> 
        <div className="bg col-md-6 col-lg-6 col-sm-12  mx-auto shadow-lg rounded-4">
          
    <div className="register-content p-relative p-4 d-block " id="signUpPage">
        <h1 className="text-center mb-3"><i>Create An Account</i></h1>

            <div className="form-group">
            <input type="text" className="form-control mb-3 mt-1 shadow" id="userName" required placeholder ="User Name"
              onChange={(e: any) => {
              setNom(e.target.value);
            
            }}/>                 
            <input type="text"  className="form-control mb-3 mt-1 shadow" id="emailRegister" required placeholder="E-mail"
             onChange={(e: any) => {
              setEmail(e.target.value);
            }}
            />                 
            </div>
            <div className="form-group">
            <input 
              onChange={(e: any) => {
              setPassword(e.target.value);
            }}
            type="password" required className="form-control mb-3 shadow  mt-1" id="passRegister1" placeholder="Enter Password"/>

            <p id= "matchPass" className="mb-3 mt-3" ></p>
            </div>

            <p id="message1" className="mb-3 mt-3 d-block"></p>

            <div className="button col-6 mx-auto ">
                <button  onClick={AddAdmine} type="submit" className="btn color  col-12  mt-3 shadow">Register</button>
            </div>

        <p className="text-center mt-4  "> You have an account? <a href="/" 
            onClick={() => {
              localStorage.removeItem("register");
            }}
            
        className="ms-1"> Sign In </a></p>

       
    </div>

        </div>
    </div>
</div>



    </Box>
  );
}

export default Register;
