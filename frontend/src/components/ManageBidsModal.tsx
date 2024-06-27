import useCollateralTokenContract from "@/hooks/contracts/useCollateralTokenContract";
import usePlatformContract from "@/hooks/contracts/usePlatformContract";
import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import addresses from "@/utils/addresses";

const ManageBidModal = () => {
    const {cusdcAddress, collateralTokenAddress} = addresses.networks.linea_sepolia;
    const {createBid} = usePlatformContract();
    const {approve, getCurrentTokenId} = useCollateralTokenContract();
  return (
    <Button 
      onClick={async () => {
        try {
          const tokenId = await getCurrentTokenId();
          await approve();
          await createBid(
            cusdcAddress,
            ethers.parseUnits("1000000", 6),
            collateralTokenAddress,
            tokenId
          );
        } catch (error) {
          console.error("Error in approve or createBid:", error);
        }
      }}
    >
      Manage Bids
    </Button>
  );
};

export default ManageBidModal;