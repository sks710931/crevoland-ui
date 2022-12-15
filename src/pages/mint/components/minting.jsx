import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import crevo from "../../../assets/crevo.png";
import React, { Fragment, useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Add,
  AddTask,
  Done,
  OpenInNew,
  Remove,
} from "@mui/icons-material";
import { useWeb3React } from "@web3-react/core";
import { busd, contractAddr, rpc } from "../../../connectors/addresses";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { abi, busdAbi } from "../../../connectors/abi";
import { formatUnits, parseEther } from "@ethersproject/units";
export const Minting = () => {

    const {account, chainId, library} = useWeb3React();
    const [count, setCount] = useState(1);
    const [mints, setMints] = useState(1000);
    const [allowedAmt, setAllowedAmt] = useState(0);
    const addCount = () =>{
        if(count <10){
            setCount(count+1);
        }
    }
    const subCount = () =>{
        if(count > 1){
            setCount(count-1);
        }
    }

    const getTotalMints = async () => {
        const provider = new JsonRpcProvider(rpc);

        const contract = new Contract(contractAddr, abi, provider);
        contract.on("CreateCrevoLandNFT", async (aaa) => {
            const mints1 = await contract.totalSupply();
            setMints(Number(formatUnits(mints1, 0)));
            await getApprovedAmt();
        })
        const mints2 = await contract.totalSupply();
        setMints(Number(formatUnits(mints2, 0)));
    }

    const getApprovedAmt = async () => {
        const provider = new JsonRpcProvider(rpc);

        const contract = new Contract(busd, busdAbi, provider);
        const allowance = await contract.allowance(account, contractAddr);
        setAllowedAmt(Number(formatUnits(allowance, 18)));
        console.log("Approved Amt:" , Number(formatUnits(allowance, 18)))
    }

    const handleApprove = async () => {
        console.log(parseEther((count*25).toString()));
        const signer = await library.getSigner();
        const contract = new Contract(busd, busdAbi, signer);
        const txResult = await contract.approve(contractAddr, parseEther((count*25).toString()));
        await txResult.wait();
        getApprovedAmt();
    }

    const handleMint = async () => {
        const signer = await library.getSigner();
        const contract = new Contract(contractAddr, abi, signer);
        const txResult = await contract.mint(count);
        await txResult.wait();

    }
    useEffect(()=>{getTotalMints()},[])
    useEffect(() => {
        if(account){
            getApprovedAmt();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account])
  return (
    <Grid container spacing={2}>
      <Grid item lg={12} sm={12} xs={12} md={12} xl={12}>
        <Paper sx={styles.rootPaper}>
          <Typography sx={styles.heading} color="primary" variant="h4">
            MINT CREVOLAND NFT
          </Typography>
          <Box sx={styles.contentBox}>
            <Grid container spacing={0}>
              <Grid item lg={6}>
                <Box sx={styles.imgBox}>
                  <img style={styles.img} src={crevo} alt="logo img" />
                </Box>
              </Grid>
              <Grid item lg={6}>
                <Box sx={styles.mintBox}>
                  <Typography variant="h4">Total Minted: {mints}/100000</Typography>
                  <Button
                    sx={{ mt: 4 }}
                    variant="contained"
                    endIcon={<OpenInNew />}
                    onClick={() => {
                        if(chainId && chainId === 56){
                            window.open(`https://bscscan.com/token/${contractAddr}`,"_blank")
                        }else{
                            window.open(`https://testnet.bscscan.com/token/${contractAddr}`,"_blank")
                        }
                    }}
                  >
                    View On BSCSCAN
                  </Button>
                  <Typography sx={{mt:3, mb:1}}>Select NFTs to mint</Typography>
                  <Box sx={styles.mintSelector}>
                    <Button onClick={subCount} color="secondary" sx={{ width: "100%" }} variant="contained">
                      <Remove />
                    </Button>
                    <Typography sx={{ width: "100%", textAlign:"center" }} variant="h4">{count}</Typography>
                    <Button color="secondary" onClick={addCount} sx={{ width: "100%" }} variant="contained">
                      <Add />
                    </Button>
                  </Box>
                  <Typography variant="h6" sx={{mt:3, mb:1}}>Total Amount : {count * 25} BUSD</Typography>
                  <Box sx={styles.actions}>
                    <Button disabled={allowedAmt >= count*25 ? true : false} onClick={handleApprove} startIcon={<AddTask />} sx={{ width: "100%", mr:1 }} variant="contained">
                       Approve
                    </Button>
                    <Button onClick={handleMint} disabled={allowedAmt < count*25 ? true : false} startIcon={<Done />} sx={{ width: "100%", ml:1 }} variant="contained">
                      Mint
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

const styles = {
  rootPaper: {
    p: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: 700,
  },
  img: {
    width: "auto",
    height: 400,
  },
  contentBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  imgBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    p: 5,
    mt: 3,
    
  },
  mintBox: {
    p: 5,
    mt: 3,
  },
  mintSelector: {
    width: "250px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    width: "400px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
};
