import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

import { APPROVED_TOKENS } from "@/utils/approvedTokens";
import * as dotenv from "dotenv";
import { useSDK } from "@metamask/sdk-react";
import { useContracts } from "./useContracts";

dotenv.config();

const useERC721 = () => {
  const { account } = useSDK();
  const [approvedTokens, setApprovedTokens] = useState(APPROVED_TOKENS);
  const [provider, setProvider] = useState<any>(null);
  const { signer } = useContracts();
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!signer) return;
  }, [signer]);

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
      console.log("...");
      try {
        const contract = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );
        const balance = await contract.balanceOf(account);
        console.log(balance.toString());
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
