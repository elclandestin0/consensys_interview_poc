import addresses from "./addresses";
import CollateralToken from './artifacts/contracts/CollateralToken.sol/CollateralToken.json';
import Cusdc from './artifacts/contracts/cUSDC.sol/cUSDC.json';

const { collateralTokenAddress, cusdcAddress } = addresses.networks.linea_sepolia;

const APPROVED_TOKENS = [
    {
        address: collateralTokenAddress,
        symbol: "Collateral NFT",
        abi: CollateralToken.abi,
    },
    {
        address: cusdcAddress,
        symbol: "cUSDC",
        abi: Cusdc.abi
    }
]