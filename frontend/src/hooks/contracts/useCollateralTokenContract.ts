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

  const getCurrentTokenId = async () => {
    if (!collateralTokenContract) {
        console.error("Contract not initialized!");
        return;
    }
    try {
        return await collateralTokenContract.currentTokenId();
    } catch (err) {
        console.error("Error retrieving current tokenId ", err);
    }
  }

  const approve = useCallback(
    async () => {
      if (!collateralTokenContract || !account) {
        console.error("Contract not initialized or invalid parameters.");
        return;
      }

      try {
        const transaction = await collateralTokenContract.approve(
          nftPlatformAddress,
          await collateralTokenContract.currentTokenId(),
          {
            from: account,
          }
        );
        await transaction.wait();
        console.log(
          "Approved token ",
        //   tokenId.toString(),
          " from account ",
          account
        );
      } catch (err) {
        console.error("Error approving token:", err);
      }
    },
    [collateralTokenContract, account, nftPlatformAddress]
  );

  useEffect(() => {
    if (collateralTokenContract) {
      setIsAwethLoading(false); // Set loading state before fetching
    }
  }, [collateralTokenContract]);

  return { approve, getCurrentTokenId, isLoading, error };
};

export default useCollateralTokenContract;
