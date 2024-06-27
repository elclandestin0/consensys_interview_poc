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
      const nextIdBigNumber = Number((await nftPlatformContract.currentBidId()).toString());
      if (nextIdBigNumber != null) {
        const allBids = [];
        for (let i = 1; i <= nextIdBigNumber; i++) {
          const bid: Bid = await nftPlatformContract.bids(i.toString());
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
        const transaction = await nftPlatformContract.createBid(
          tokenAddress,
          amount,
          nftContract,
          tokenId,
          {
            from: account,
          }
        );
        await transaction.wait();
        console.log("Bid created successfully");
      } catch (err) {
        console.error("Error creating bid:", err);
      }
    },
    [nftPlatformContract, account]
  );

  useEffect(() => {
    if (nftPlatformContract) {
      setIsLoading(true); // Set loading state before fetching
      fetchBids().catch((error) => {
        console.error("Error fetching bids in useEffect:", error);
        setError(error); // Set error state if an error occurs
        setIsLoading(false); // Update loading state
      });
    }
  }, []);

  return { fetchBids, createBid, bids };
};

export default usePlatformContract;
