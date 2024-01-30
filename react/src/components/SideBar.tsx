/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import alaa from "./alaa.jpg";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Stack, Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from "@mui/icons-material/Storefront";
const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type variable = {
  setOpen: Function;
  open: any;
};
function SideBar({ setOpen, open }: variable) {
  const location = useLocation();

  const theme = useTheme();
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <Stack>
            <ListItem
              // key={item.path}
              disablePadding
              sx={{ display: "block" }}
            >
              <Tooltip title={open ? null : "Votre Stockage"} placement="left">
                <ListItemButton
                  onClick={() => {
                    navigate("/");
                  }}
                  sx={{
                    // minHeight: 48,
                    height: "48px",

                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    bgcolor: location.pathname === "/" ? grey[300] : null,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {/* <HomeOutlinedIcon />
                     */}
                    <StorefrontIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary=" Votre Stockage"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <Divider />

            <ListItem
              disablePadding
              sx={{
                display: "block",
                // border :"2px solid red" ,
                flexGrow: 2,
              }}
            >
              <Tooltip title={open ? null : "Client"} placement="left">
                <ListItemButton
                  onClick={() => {
                    navigate("/client");
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    bgcolor: location.pathname === "/client" ? grey[300] : null,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Client"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
              <Divider />
            <ListItem
              // key={item.path}
              disablePadding
              sx={{ display: "block" }}
            >
              <Tooltip title={open ? null : "Statistique"} placement="left">
                <ListItemButton
                  onClick={() => {
                    navigate("/statique");
                  }}
                  sx={{
                    // minHeight: 48,
                    height: "48px",

                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    bgcolor: location.pathname === "/statique" ? grey[300] : null,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <QueryStatsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Statistique"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <Divider />
          </Stack>
          <Divider />
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

export default SideBar;
