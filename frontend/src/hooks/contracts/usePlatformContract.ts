import { useCallback, useEffect, useState } from "react";
import { useContracts } from "./useContracts"; // Import your useContracts hook

import { ethers } from "ethers";
import addresses from "../../utils/addresses";
import { useSDK } from "@metamask/sdk-react";

interface Bid {
  bidId: number;
  tokenContract: string;
  askAmount: string;
  from: string;
  nftContract: string;
  tokenId: number;
  accepted: boolean;
}

const usePlatformContract = () => {
  const { nftPlatformContract, cusdcContract } = useContracts();
  const { account } = useSDK(); // Get the current account from MetaMask
  const [bids, setBids] = useState<Bid[]>([]);
  // const [ownedPolicies, setOwnedPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(nftPlatformContract);
  }, [nftPlatformContract]);

  const fetchBids = async () => {
    if (!nftPlatformContract) {
      console.error("Contract not initialized.");
      return;
    }
    try {
      const nextIdBigNumber = await nftPlatformContract.currentBidId();
      if (nextIdBigNumber != null) {
        const allBids = [];
        const nextId = nextIdBigNumber; // Convert BigNumber to a number
        for (let i = 1; i < nextId; i++) {
          const bid = await nftPlatformContract.bids(i);
          allBids.push(bid);
        }
        console.log(allBids);
        setBids(allBids);
        setIsLoading(false);
      } else {
        console.error("currentBidId did not return a valid value.");
      }
    } catch (error) {
      console.error("Error fetching all bids:", error);
    }
  };

  const createBid = useCallback(
    async (
      tokenAddress: string,
      amount: any,
      nftContract: string,
      tokenId: any
    ) => {
      if (
        !nftPlatformContract ||
        !tokenId ||
        !amount ||
        !tokenAddress ||
        !nftContract
      ) {
        console.error("Contract not initialized or invalid parameters.");
        return;
      }

      try {
        // Assuming you have ethers.js or a similar library
        const transaction = await nftPlatformContract.createBid(
          tokenAddress,
          amount,
          nftContract,
          tokenId,
          {
            from: account,
          }
        );
        await transaction.wait(); // Wait for the transaction to be mined
        console.log("Bid created successfully");
      } catch (err) {
        console.error("Error creating bid:", err);
      }
    },
    [nftPlatformContract, account]
  );

  useEffect(() => {
    console.log("hello");
    if (nftPlatformContract) {
      setIsLoading(true); // Set loading state before fetching
      fetchBids().catch((error) => {
        console.error("Error fetching policies in useEffect:", error);
        setError(error); // Set error state if an error occurs
        setIsLoading(false); // Update loading state
      });
    }
  }, []);

  return { fetchBids, createBid };
};

export default usePlatformContract;
