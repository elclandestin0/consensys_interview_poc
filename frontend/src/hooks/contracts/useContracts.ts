import {useState, useEffect} from 'react';
import CollateralToken from '../../utils/artifacts/contracts/CollateralToken.sol/CollateralToken.json';
import cUSDC from  '../../utils/artifacts/contracts/cUSDC.sol/cUSDC.json';
import NFTPlatform from  '../../utils/artifacts/contracts/NFTPlatform.sol/NFTPlatform.json';
import addresses from '../../utils/addresses';
import { ethers } from 'ethers';

export function useContracts() {
    const {cusdcAddress, nftPlatformAddress, collateralTokenAddress} = addresses.networks.linea_sepolia;
    const [nftPlatformContract, setNftPlatformContract] = useState<ethers.Contract | null>(null);
    const [cusdcContract, setCusdcContract] = useState<ethers.Contract | null>(null);
    const [collateralTokenContract, setCollateralTokenContract] = useState<ethers.Contract | null>(null);
    useEffect(() => {
        const initializeContracts = async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    console.log("hello")
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    console.log("here?")
                    await provider.send("eth_requestAccounts", []); // Request account access if needed
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
