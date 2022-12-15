import React from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../connectors/injected-connector";
import { walletconnect } from "../connectors/wallet-conect";
import mm from "../assets/metamask.svg";
import wc from "../assets/wc.svg";
export const Connect = () => {
  const { activate } = useWeb3React();
  const handleMM = () => {
    activate(injectedConnector);
  };

  const handleWC = () => {
    activate(walletconnect);
  };
  return (
    <Box>
      <Paper sx={{mb:3}}>
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
      </Paper>

      <Paper>
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
      </Paper>
    </Box>
  );
};
