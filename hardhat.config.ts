import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: { version: "0.8.20" },
  networks: {
    linea_sepolia: {
      url: `https://linea-sepolia.infura.io/v3/` + process.env.INFURA_ENDPOINT || "",
      accounts: {
        mnemonic: process.env.MNEMONIC_PHRASE || "",
      },
    },
  },
};

export default config;
