import { Box, Container, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import Register from "./Register";
import { useState, useEffect } from "react";
import Login from "./Login";

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {
  const [register, setRegister] = useState("false");
  useEffect(() => {
    let userRegister: any = localStorage.getItem("register");
    setRegister(userRegister);
    
  }, [register]);
  return (
    <div>
      { ! register ? (
        <Login />
     
         
      
      ) : (
    <Register />
       
              
         
      )}
    </div>
  );
}

export default Overview;
