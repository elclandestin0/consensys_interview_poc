import { useCallback, useEffect, useState } from "react";
import { useContracts } from "./useContracts"; // Import your useContracts hook

import { ethers } from "ethers";
import addresses from "../../utils/addresses";
import { useSDK } from "@metamask/sdk-react";

const usePolicyContract = () => {
  const { nftPlatformContract, cusdcContract } = useContracts();
  const { account } = useSDK(); // Get the current account from MetaMask
  const [bids, setBids] = useState([]);
  // const [ownedPolicies, setOwnedPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // const checkPolicyOwnership = useCallback(async (policyId: number, accountAddress: String) => {
  //     if (!policyMakerContract || !policyId || !accountAddress) {
  //         return false;
  //     }
  //     try {
  //         return await policyMakerContract.policyOwners(policyId, accountAddress);
  //     } catch (err) {
  //         console.error('Error checking policy ownership:', err);
  //         return false;
  //     }
  // }, [policyMakerContract]);

  const fetchBids = async (): Promise<any[]> => {
    if (!nftPlatformContract) {
      console.error("Contract not initialized.");
      return [];
    }
    try {
      const allBids: any = [];
      const nextIdBigNumber = await nftPlatformContract.currentBidId();
      if (nextIdBigNumber != null) {
        for (let i = 1; i < nextIdBigNumber; i++) {
          const bid = await nftPlatformContract.bids(i.toString());
          console.log(bid);
          // const formattedPolicy = {
          //     id: i,
          //     coverageAmount: policy.coverageAmount.toString(),
          //     initialPremiumFee: policy.initialPremiumFee.toString(),
          //     initialCoveragePercentage: policy.initialCoveragePercentage.toString(),
          //     premiumRate: policy.premiumRate.toString(),
          //     duration: Number(policy.duration),
          //     penaltyRate: Number(policy.penaltyRate),
          //     monthsGracePeriod: Number(policy.monthsGracePeriod),
          //     investmentFundPercentage: Number(policy.investmentFundPercentage),
          //     coverageFundPercentage: Number(policy.coverageFundPercentage),
          //     creator: policy.creator
          // };

          allBids.push(bid); // Update loading state
        }
        setBids(allBids);
        setIsLoading(false);

        return allBids;
      } else {
        console.error("nextPolicyId did not return a BigNumber.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching all policies:", error);
      return [];
    }
  };

  // const payPremium = useCallback(async (policyId: any, premiumAmount: any) => {
  //     if (!policyMakerContract || !policyId || !premiumAmount) {
  //         console.error("Contract not initialized or invalid parameters.");
  //         return;
  //     }

  //     try {
  //         // Assuming you have ethers.js or a similar library
  //         const transaction = await policyMakerContract.payPremium(policyId, premiumAmount, {
  //             from: account
  //         });
  //         await transaction.wait(); // Wait for the transaction to be mined
  //         console.log('Premium paid successfully');
  //     } catch (err) {
  //         console.error('Error paying initial premium:', err);
  //     }
  // }, [policyMakerContract, account]);

  // const fetchPolicy = useCallback(async (policyId: String) => {
  //     if (!policyMakerContract || !policyId) {
  //         return null;
  //     }
  //     try {
  //         const policy = await policyMakerContract.policies(policyId);
  //         return {
  //             id: policyId,
  //             creator: policy.creator,
  //             coverageAmount: policy.coverageAmount.toString(),
  //             initialPremiumFee: policy.initialPremiumFee.toString(),
  //             initialCoveragePercentage: policy.initialCoveragePercentage.toString(),
  //             premiumRate: policy.premiumRate.toString(),
  //             duration: Number(policy.duration),
  //             penaltyRate: Number(policy.penaltyRate),
  //             monthsGracePeriod: Number(policy.monthsGracePeriod),
  //             coverageFundPercentage: Number(policy.coverageFundPercentage),
  //             investmentFundPercentage: Number(policy.investmentFundPercentage)
  //         };

  //     } catch (err) {
  //         console.error('Error checking for policy: ', err);
  //         return false;
  //     }
  // }, [policyMakerContract]);

  useEffect(() => {
    if (nftPlatformContract) {
      setIsLoading(true); // Set loading state before fetching
      fetchBids().catch((error) => {
        console.error("Error fetching policies in useEffect:", error);
        setError(error); // Set error state if an error occurs
        setIsLoading(false); // Update loading state
      });
    }
  }, []);
  
  return { fetchBids };
};

export default usePolicyContract;
