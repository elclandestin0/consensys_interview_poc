import { useState, useEffect } from "react";
import CollateralToken from "../../utils/artifacts/contracts/CollateralToken.sol/CollateralToken.json";
import cUSDC from "../../utils/artifacts/contracts/cUSDC.sol/cUSDC.json";
import NFTPlatform from "../../utils/artifacts/contracts/NFTPlatform.sol/NFTPlatform.json";
import addresses from "../../utils/addresses";
import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config

export function useContracts() {
  const { cusdcAddress, nftPlatformAddress, collateralTokenAddress } =
    addresses.networks.linea_sepolia;
  const [nftPlatformContract, setNftPlatformContract] =
    useState<ethers.Contract | null>(null);
  const [cusdcContract, setCusdcContract] = useState<ethers.Contract | null>(
    null
  );
  const [collateralTokenContract, setCollateralTokenContract] =
    useState<ethers.Contract | null>(null);
  useEffect(() => {
    const initializeContracts = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);

          const API_KEY: any = process.env.INFURA_ENDPOINT;
          const PRIVATE_KEY: any = process.env.MNEMONIC_PHRASE;

          const infuraProvider = new ethers.InfuraProvider("sepolia", API_KEY);
          await provider.send("eth_requestAccounts", []); // Request account access if needed

          const signer = new ethers.Wallet(PRIVATE_KEY, infuraProvider);

          const nftPlatform = new ethers.Contract(
            nftPlatformAddress,
            NFTPlatform.abi,
            provider ? await provider.getSigner() : signer
          );

          const cusdc = new ethers.Contract(
            cusdcAddress,
            cUSDC.abi,
            provider ? await provider.getSigner() : signer
          );

          const collateralToken = new ethers.Contract(
            collateralTokenAddress,
            CollateralToken.abi,
            provider ? await provider.getSigner() : signer
          );
          setCusdcContract(cusdc);
          setNftPlatformContract(nftPlatform);
          setCollateralTokenContract(collateralToken);
        } catch (error) {
          console.error("Error initializing contracts:", error);
        }
      } else {
        console.error("MetaMask is not installed!");
      }
    };

    initializeContracts();
  }, []);

  return { collateralTokenContract, cusdcContract, nftPlatformContract };
}
