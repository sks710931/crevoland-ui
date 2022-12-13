import { Box, Button, Dialog, Divider, Typography } from "@mui/material";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnectDlgOpen } from "../app/app-slice";
import mm from "../assets/metamask.svg";
import wc from "../assets/wc.svg";

export const ConnectWallet = () => {
  const dispatch = useDispatch();
  const isDlgOpen = useSelector((state) => state.app.connectDlgOpen);
  return (
    <Box>
      <Button
        onClick={() => {dispatch(setConnectDlgOpen(true))}}
        color="secondary"
        variant="outlined"
        startIcon={<WalletIcon />}
      >
        Connect Wallet
      </Button>
      <ConnectWalletDlg
        open={isDlgOpen}
        onClose={() => dispatch(setConnectDlgOpen(false))}
      />
    </Box>
  );
};

const ConnectWalletDlg = ({ open, onClose }) => {

    const handleMM = () => {
        onClose();
    }

    const handleWC = () => {
        onClose();
    }

  return <Dialog maxWidth="sm" fullWidth onClose={onClose} open={open}>
      <Box>
        <Box onClick={handleMM} flexDirection="column" sx={{p:2, cursor:"pointer"}} display="flex" alignItems="center" justifyContent="center">
            <img src={mm} width="80px" alt="metamask logo" />
            <Typography variant="h4" sx={{fontWeight: "700"}} >Metamask</Typography>
            <Typography color="gray" variant="h6">Connect your Metamask wallet</Typography>
        </Box>
        <Divider/>
        <Box onClick={handleWC} flexDirection="column" sx={{p:2, cursor:"pointer"}} display="flex" alignItems="center" justifyContent="center">
            <img src={wc} width="80px" alt="wallet connect logo" />
            <Typography variant="h4" sx={{fontWeight: "700"}} >WalletConnect</Typography>
            <Typography color="gray" variant="h6">Scan with wallet connect to connect</Typography>
        </Box>
      </Box>
  </Dialog>;
};
