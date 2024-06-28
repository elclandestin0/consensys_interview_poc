import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import addresses from "@/utils/addresses";
import CollateralToken from "@/utils/artifacts/contracts/CollateralToken.sol/CollateralToken.json";

import * as dotenv from "dotenv";

dotenv.config();


const { collateralTokenAddress } = addresses.networks.linea_sepolia;
const APPROVED_TOKENS = [
  { address: collateralTokenAddress, name: "cNFT", abi: CollateralToken.abi },
  {
    address: collateralTokenAddress,
    name: "cNFT copy",
    abi: CollateralToken.abi,
  },
];

const useERC721 = () => {
  const [approvedTokens, setApprovedTokens] = useState(APPROVED_TOKENS);
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const initProvider = async () => {
      if (typeof window.ethereum !== "undefined") {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);
        await web3Provider.send("eth_requestAccounts", []);
        const signer = web3Provider.getSigner();
        setSigner(signer);
      } else {
        const API_KEY: any = process.env.INFURA_ENDPOINT;
        const PRIVATE_KEY: any = process.env.MNEMONIC_PHRASE;
        const infuraProvider = new ethers.InfuraProvider("sepolia", API_KEY);
        const signer = new ethers.Wallet(PRIVATE_KEY, infuraProvider);
        setSigner(signer);
        setProvider(infuraProvider);
      }
    };

    initProvider();
  }, []);

  const mintToken = useCallback(
    async (contractAddress: string, abi: any, amount = 1) => {
      if (!signer) {
        setError("Signer not initialized");
        return;
      }

      try {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const tx = await contract.mint(await signer.getAddress(), amount); // Assuming mint function takes recipient address and amount
        await tx.wait();
        console.log(`Minted ${amount} tokens to ${await signer.getAddress()}`);
      } catch (err) {
        console.error("Error minting tokens:", err);
        setError(err);
      }
    },
    [signer]
  );

  const fetchBalance = useCallback(
    async (contractAddress: string, abi: any, ownerAddress: string) => {
      if (!provider) {
        setError("Provider not initialized");
        return;
      }

      try {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const balance = await contract.balanceOf(ownerAddress);
        return balance.toString();
      } catch (err) {
        console.error("Error fetching balance:", err);
        setError(err);
        return null;
      }
    },
    [provider]
  );

  return {
    approvedTokens,
    mintToken,
    fetchBalance,
    error,
  };
};

export default useERC721;
