import {useState, useEffect} from 'react';
import {ethers, Contract} from 'ethers';
import CollateralToken from '../../utils/artifacts/contracts/CollateralToken.sol/CollateralToken.json';
import cUSDC from  '../../utils/artifacts/contracts/cUSDC.sol/cUSDC.json';
import NFTPlatform from  '../../utils/artifacts/contracts/NFTPlatform.sol/NFTPlatform.json';
import addresses from '../../utils/addresses';

export function useContracts() {
    const {cusdcAddress, nftPlatformAddress, collateralTokenAddress} = addresses.networks.linea_sepolia;
    const [nftPlatformContract, setNftPlatformContract] = useState<Contract | null>(null);
    const [cusdcContract, setCusdcContract] = useState<Contract | null>(null);
    const [collateralTokenContract, setCollateralTokenContract] = useState<Contract | null>(null);
    useEffect(() => {
        const initializeContracts = async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const provider = new ethers.JsonRpcProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const nftPlatform = new ethers.Contract(
                        nftPlatformAddress,
                        NFTPlatform.abi,
                        signer
                    );

                    const cusdc = new ethers.Contract(
                        cusdcAddress,
                        cUSDC.abi,
                        signer
                    );

                    const collateralToken = new ethers.Contract(
                        collateralTokenAddress,
                        CollateralToken.abi,
                        signer
                    )
                    
                    setCusdcContract(cusdc);
                    setNftPlatformContract(nftPlatform);
                    setCollateralTokenContract(collateralToken);
                } catch (error) {
                    console.error('Error initializing contracts:', error);
                }
            } else {
                console.error('MetaMask is not installed!');
            }
        };

        initializeContracts();
    }, []);

    return {collateralTokenContract, cusdcContract, nftPlatformContract};
}
