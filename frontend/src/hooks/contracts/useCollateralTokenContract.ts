import { useCallback, useEffect, useState } from "react";
import { useContracts } from "./useContracts"; // Import your useContracts hook
import addresses from "@/utils/addresses";
import { useSDK } from "@metamask/sdk-react";

const useCollateralTokenContract = () => {
  const { nftPlatformAddress } = addresses.networks.linea_sepolia;
  const { collateralTokenContract } = useContracts();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const { account } = useSDK();

  const getCurrentTokenId = async () => {
    if (!collateralTokenContract) {
      console.error("Get current tokenId: Contract not initialized!");
      return;
    }
    try {
      return await collateralTokenContract.currentTokenId();
    } catch (err) {
      console.error("Error retrieving current tokenId ", err);
    }
  };

  const approve = useCallback(async (tokenId: any) => {
    if (!collateralTokenContract || !account) {
      console.error("Approve: Contract not initialized or invalid parameters.");
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
  }, [collateralTokenContract, account, nftPlatformAddress]);

  const mint = useCallback(async () => {
    if (!collateralTokenContract || !account) {
      console.error("Mint: Contract not initialized or invalid parameters.");
      return;
    }

    try {
      const transaction = await collateralTokenContract.mint(account);
      await transaction.wait();
      console.log("Minted NFT ");
    } catch (err) {
      console.error("Error approving token:", err);
    }
  }, [collateralTokenContract, account]);

  useEffect(() => {
    if (collateralTokenContract) {
      setIsLoading(false); // Set loading state before fetching
    }
  }, [collateralTokenContract]);

  return { approve, getCurrentTokenId, mint, isLoading, error };
};

export default useCollateralTokenContract;
