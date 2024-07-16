import addresses from "./addresses";
import CollateralToken from "./artifacts/contracts/CollateralToken.sol/CollateralToken.json";
import Cusdc from "./artifacts/contracts/cUSDC.sol/cUSDC.json";

const { collateralTokenAddress, cusdcAddress } =
  addresses.networks.linea_sepolia;

export const APPROVED_721_TOKENS = [
  {
    address: collateralTokenAddress,
    symbol: "Collateral NFT",
    abi: CollateralToken.abi,
  },
];

export const APPROVED_20_TOKENS = [
  {
    address: cusdcAddress,
    symbol: "cUSDC",
    abi: Cusdc.abi,
  },
];
