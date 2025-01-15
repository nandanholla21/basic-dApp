import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
const config: HardhatUserConfig = {
  solidity: "0.8.28",
  sourcify: {
    enabled: true
  },
  networks:{
    hardhat:{
      chainId:1337
    }
  }
};

export default config;
