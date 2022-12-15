import { Box, Button, Dialog, Divider, Typography, Menu, MenuItem } from "@mui/material";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnectDlgOpen } from "../app/app-slice";
import mm from "../assets/metamask.svg";
import wc from "../assets/wc.svg";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../connectors/injected-connector";
import { walletconnect } from "../connectors/wallet-conect";
import { Logout } from "@mui/icons-material";

export const ConnectWallet = () => {
  const dispatch = useDispatch();
  const { account, deactivate } = useWeb3React();
  const isDlgOpen = useSelector((state) => state.app.connectDlgOpen);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    deactivate();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {!account && (
        <Button
          onClick={() => {
            dispatch(setConnectDlgOpen(true));
          }}
          color="secondary"
          variant="outlined"
          startIcon={<WalletIcon />}
        >
          Connnect Wallet
        </Button>
      )}
      {account && (
        <Button
          onClick={handleClick}
          color="secondary"
          variant="outlined"
          startIcon={<WalletIcon />}
        >
          {account ? shortAddress(account) : "Connnect Wallet"}
        </Button>
      )}
      <ConnectWalletDlg
        open={isDlgOpen}
        onClose={() => dispatch(setConnectDlgOpen(false))}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <MenuItem onClick={handleLogout}><Logout /> Logout</MenuItem>
      </Menu>
    </Box>
  );
};

const ConnectWalletDlg = ({ open, onClose }) => {
  const { activate } = useWeb3React();
  const handleMM = () => {
    activate(injectedConnector);
    onClose();
  };

  const handleWC = () => {
    activate(walletconnect);
    onClose();
  };

  return (
    <Dialog maxWidth="sm" fullWidth onClose={onClose} open={open}>
      <Box>
        <Box
          onClick={handleMM}
          flexDirection="column"
          sx={{ p: 2, cursor: "pointer" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img src={mm} width="80px" alt="metamask logo" />
          <Typography variant="h4" sx={{ fontWeight: "700" }}>
            Metamask
          </Typography>
          <Typography color="gray" variant="h6">
            Connect your Metamask wallet
          </Typography>
        </Box>
        <Divider />
        <Box
          onClick={handleWC}
          flexDirection="column"
          sx={{ p: 2, cursor: "pointer" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img src={wc} width="80px" alt="wallet connect logo" />
          <Typography variant="h4" sx={{ fontWeight: "700" }}>
            WalletConnect
          </Typography>
          <Typography color="gray" variant="h6">
            Scan with wallet connect to connect
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};

function shortAddress(address) {
  const start = address.substring(0, 7);
  const last = address.substring(address.length - 7, address.length);
  return `${start}...${last}`;
}
