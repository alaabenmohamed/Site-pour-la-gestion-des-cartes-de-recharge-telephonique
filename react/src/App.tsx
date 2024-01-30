import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // important a ajouter tjrs comme 1ére etape
import Overview from "./pages/conexions/Index";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function App() {
  const [conexions, setconexions] = useState("");
  const [open, setOpen] = React.useState(false);

   useEffect(() => {
    let userRegister: any = localStorage.getItem("conexions");
    setconexions(userRegister);
    console.log(conexions);
  }, [conexions]);
useEffect(() => {
    console.log(!localStorage.getItem("conexions"));

})
 const [mode, setMode] = React.useState(
   localStorage.getItem("currentMode")
     ? localStorage.getItem("currentMode")
     : "light"
 );
//  const theme = React.useMemo(
//       () =>
//       //createTheme(getDesignTokens({mode})),
//       [mode]
//     );
  return (
    <div className="App">
       {!conexions ? (
        <Overview />
      ) : (
         <Box>

        
       

          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <TopBar {...{ setOpen, open, setMode }} />
            <SideBar {...{ setOpen, open }} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              <Outlet />
            </Box>
          </Box>
       

    </Box>
     )}
    </div>
  );
}

export default App;
