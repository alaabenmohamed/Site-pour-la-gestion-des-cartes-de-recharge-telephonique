/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Login() {

  const [admine, setadmine] = useState({
    email: "",
    mdp: "",
  });

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  async function getuser() {
    try {
      fetch("http://localhost:7000/masterLogin", {
        method: "POST",
        body: JSON.stringify(admine),
        headers: { "Content-type": "application/json;charset=utf-8" },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.length >= 1) {
              console.log(result);

              localStorage.setItem("userid", result[0].master_id);
              localStorage.setItem("nom", result[0].nom);
        
              localStorage.setItem("mail", result[0].email);
              localStorage.setItem("mdp", result[0].mdp);
          
              localStorage.setItem("user", result[0].mdp); //responsable de controle
              localStorage.setItem("conexions", "false");
              // navigate("/");
      
              window.location.reload();
            } else {
              Swal.fire({
                icon: "error",
                title: "ATTENTION",
                text: "Veuillez vérifier vos identifiants!",
              });
            }
          },
          (error) => {
            console.error(error.message);
          }
        );
    } catch (err: any) {
      console.error(err.message);
    }
  }

 
  return (
    <Box >
   
<div className="background">
    <div className="container"> 
        <div className="bg col-md-6 col-lg-6 col-sm-12  mx-auto shadow-lg rounded-4">
          
    <div className="register-content p-relative p-4 d-block " id="signUpPage">
        <h1 className="text-center mb-3"><i>Login</i></h1>

            <div className="form-group">
                         
            <input type="text"  className="form-control mb-3 mt-1 shadow" id="emailRegister" required placeholder="E-mail"
            onChange={(e) => {
              admine.email = e.target.value;
              setadmine(admine);
            }}
            />                 
            </div>
            <div className="form-group">
            <input 
              onChange={(e: any) => {
              admine.mdp = e.target.value;
              setadmine(admine);
            }}
            type="password" required className="form-control mb-3 shadow  mt-1" id="passRegister1" placeholder="Password"/>

            <p id= "matchPass" className="mb-3 mt-3" ></p>
            </div>

            <p id="message1" className="mb-3 mt-3 d-block"></p>

            <div className="button col-6 mx-auto ">
                <button   onClick={() => {
              getuser();
            }}  type="submit" className="btn  color col-12  mt-3 ">Login</button>
            </div>

        <p className="text-center mt-4  "> Don't have an account? <a  href="/"
        onClick={() => {
                 localStorage.setItem("register", "true");
            }}
            
        className="ms-1"> Sign Up</a></p>

       
    </div>

        </div>
    </div>
</div>



    </Box>
  );
}

export default Login;
