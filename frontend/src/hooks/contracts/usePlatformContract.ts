import { useCallback, useEffect, useState } from "react";
import { useContracts } from "./useContracts"; // Import your useContracts hook
import { ethers, BigNumber } from "ethers";
import addresses from "../../utils/addresses";
import { useSDK } from "@metamask/sdk-react";
import useCollateralTokenContract from "./useCollateralTokenContract";

export interface Bid {
  bidId: number;
  tokenContract: string;
  askAmount: string;
  from: string;
  nftContract: string;
  tokenId: number;
  accepted: boolean;
  lender: string;
  borrower: string;
  repaid: boolean;
  defaulted: boolean;
}

const usePlatformContract = () => {
  const {cusdcAddress, collateralTokenAddress} = addresses.networks.linea_sepolia;
  const { getCurrentTokenId } = useCollateralTokenContract();
  const { nftPlatformContract, cusdcContract } = useContracts();
  const { account } = useSDK(); // Get the current account from MetaMask
  const [bids, setBids] = useState<Bid[]>([]);
  // const [ownedPolicies, setOwnedPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBids = async () => {
    if (!nftPlatformContract) {
      console.error("Contract not initialized.");
      return;
    }
    try {
      const nextIdBigNumber = Number(
        (await nftPlatformContract.currentBidId()).toString()
      );
      if (nextIdBigNumber != null) {
        const allBids = [];
        for (let i = 1; i <= nextIdBigNumber; i++) {
          const bid: any = await nftPlatformContract.bids(i.toString());
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
         // Ensure amount is a string before parsing to BigNumber
         const parsedAmount = ethers.parseUnits(amount.toString(), 6);

         // Ensure tokenId is a number
         let parsedTokenId: any = BigInt(tokenId);
         console.log(parsedTokenId);
         console.log(parsedAmount);

         const transaction = await nftPlatformContract.createBid(
           tokenAddress,
           parsedAmount,
           nftContract,
           parsedTokenId,
           {
             from: account,
           }
         );
         await transaction.wait();
         console.log("created bid successfully");
      } catch (err) {
        console.error("Error creating bid:", err);
      }
    },
    [nftPlatformContract, account]
  );

  const acceptBid = useCallback(
    async (bidId: number) => {
      if (!nftPlatformContract || bidId == null) {
        console.error("Contract not initialized or invalid parameters.");
        return;
      }

      try {
        const id = bidId;
        console.log(id);

        const transaction = await nftPlatformContract.acceptBid(id, {
          from: account,
        });
        await transaction.wait();
        console.log("Bid accepted successfully");
      } catch (err) {
        console.error("Error accepting bid:", err);
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
  }, [nftPlatformContract]);

  return { fetchBids, createBid, bids, acceptBid };
};

export default usePlatformContract;
