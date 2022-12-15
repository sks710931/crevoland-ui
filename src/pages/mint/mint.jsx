import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import React, { Fragment } from "react";
import { Connect } from "../../shared/connect";
import { Minting } from "./components/minting";

export const MintPage = () => {
  const { account } = useWeb3React();

  return <Fragment>{!account ? <Connect /> : <Minting />}</Fragment>;
};
