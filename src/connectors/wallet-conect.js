import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
const RPC_URLS = {
    56: "https://bsc-dataseed1.binance.org",
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
  }
export const walletconnect = new WalletConnectConnector({
    rpc: RPC_URLS,
    chainId: 56,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true
  })