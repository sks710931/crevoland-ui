import React from "react";
import { Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "../../app/app-slice";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import { ConnectWallet } from "../../shared/connect-wallet";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

const ApplicationBar = () => {
  const theme = useTheme();
  const isSidebarOpen = useSelector((state) => state.app.sidebarOpen);
  const dispatch = useDispatch();
  return (
    <AppBar position="fixed" open={isSidebarOpen}>
      <Toolbar>
        <IconButton
          color="secondary"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(setSidebarOpen(true))}
          sx={{
            marginRight: 2,
            ...(isSidebarOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5"  sx={{color: theme.palette.secondary.main}} noWrap component="div">
          CREVOLAND
        </Typography>

        <span style={{ flex: "1 auto" }}></span>

        <ConnectWallet />
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
