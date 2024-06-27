import { useCallback, useEffect, useState } from "react";
import { useContracts } from "./useContracts"; // Import your useContracts hook
import addresses from "@/utils/addresses";
import { useSDK } from "@metamask/sdk-react";

const useCollateralTokenContract = () => {
  const { nftPlatformAddress } = addresses.networks.linea_sepolia;
  const { collateralTokenContract } = useContracts();
  const [isLoading, setIsAwethLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const { account } = useSDK();

  const approve = useCallback(
    async (tokenId: any) => {
      if (!collateralTokenContract || !account || tokenId) {
        console.error("Contract not initialized or invalid parameters.");
        return;
      }

      try {
        // Assuming you have ethers.js or a similar library
        const transaction = await collateralTokenContract.approve(
          nftPlatformAddress,
          await collateralTokenContract.currentTokenId(),
          {
            from: account,
          }
        );
        await transaction.wait(); // Wait for the transaction to be mined
        console.log("Approved token ", tokenId, " from account ", account);
      } catch (err) {
        console.error("Error creating bid:", err);
      }
    },
    [collateralTokenContract, account]
  );

  useEffect(() => {
    if (collateralTokenContract) {
      setIsAwethLoading(false); // Set loading state before fetching
    }
  }, [collateralTokenContract]);

  return { approve, isLoading, error };
};

export default useCollateralTokenContract;
