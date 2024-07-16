import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

import {APPROVED_TOKENS} from '@/utils/approvedTokens';
import * as dotenv from "dotenv";
import { useSDK } from "@metamask/sdk-react";

dotenv.config();

const useERC721 = () => {
  const { account } = useSDK();
  const [approvedTokens, setApprovedTokens] = useState(APPROVED_TOKENS);
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const initProvider = async () => {
      if (typeof window.ethereum !== "undefined") {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        // await web3Provider.send("eth_requestAccounts", []); // Request account access
        setProvider(web3Provider);
        const signer = await web3Provider.getSigner();
        setSigner(signer);
      } else {
        console.error("No provider set!");
      }
    };

    initProvider();
  }, [account]);

  const mintToken = useCallback(
    async (contractAddress: string, abi: any) => {
    console.log("minting token..");
      if (!signer) {
        setError("Signer not initialized");
        return;
      }

      console.log("trying to mint..");

      try {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        console.log("account", account);
        console.log((await contract.currentTokenId()).toString());
        const tx = await contract.mint(account); // Assuming mint function takes recipient address and amount
        await tx.wait();
      } catch (err) {
        console.error("Error minting tokens:", err);
        setError(err);
      }
    },
    [signer, account]
  );

  const fetchBalance = useCallback(
    async (contractAddress: string, abi: any) => {
      if (!provider) {
        setError("Provider not initialized");
        return;
      }
      try {
        const contract = new ethers.Contract(
          contractAddress,
          abi,
          await provider.getSigner()
        );
        const balance = await contract.balanceOf(account);
        return balance.toString();
      } catch (err) {
        console.error("Error fetching balance:", err);
        setError(err);
        return null;
      }
    },
    [provider, account]
  );

  return {
    approvedTokens,
    mintToken,
    fetchBalance,
    error,
  };
};

export default useERC721;
