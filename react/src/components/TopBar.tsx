import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, IconButton, InputBase, Stack, alpha, styled, useTheme } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import Setting from "./Setting";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),  
}));



const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));



type variable = {
  open: any;
  setOpen: Function;
  setMode: Function;
};
function TopBar({ open, setOpen, setMode }: variable) {
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const [showsetting, setShowsetting] = useState(false);
  const [isUpdateSetting, setIsUpdateSetting] = useState<boolean>(false);


  function LogOut() {
  localStorage.removeItem("nom");
  localStorage.removeItem("prenom");
  localStorage.removeItem("password");
  localStorage.removeItem("user");
  // localStorage.removeItem('user_id');
  localStorage.setItem("user_id", "0");
  localStorage.removeItem("image");
 localStorage.removeItem("conexions");

 // navigate("/");
  window.location.reload();

}
  return (
    <div>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
         
            <SearchIconWrapper>
           
            </SearchIconWrapper>
          
          <Box flexGrow={1} />

          <Stack direction={"row"}>
             <Button variant="contained"sx={{ mr: 2 }}   onClick={() => {
               setShowsetting(true);
             }
             } >
              < SettingsIcon /> 
                  </Button>
            <Button variant="contained"
                 onClick={LogOut}
                  >
                    <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                    Déconnexion
                  </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Setting   {...{showsetting,setShowsetting,setIsUpdateSetting}}/>
    </div>
  );
}

export default TopBar;
