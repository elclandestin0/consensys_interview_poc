import { useEffect, useState } from "react";
import { useContracts } from "./useContracts"; // Import your useContracts hook
import { ethers } from "ethers";

const useCusdcContract = () => {
  const { cusdcContract } = useContracts();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(()=>{}, [cusdcContract]);

  const fetchTokenBalance = async (address: string): Promise<any> => {
    if (!cusdcContract) {
      console.error("Contract not initialized.");
      return null;
    }
    try {
      // Invest in Aave Pool
      return await cusdcContract.balanceOf(address);
    } catch (error) {
      console.error("Error fetching pool reserve data:", error);
      setError(error);
      return [];
    }
  };

  const mintTokens = async (): Promise<void> => {
    if (!cusdcContract) {
      console.error("Contract not initialized.");
      return;
    }
    try {
      const amount = ethers.parseUnits("100000", 6); // Convert 100000 to the appropriate unit
      const tx = await cusdcContract.mint(amount);
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Minted 100000 cUSDC to the msg.sender");
    } catch (error) {
      console.error("Error minting tokens:", error);
      setError(error);
    }
  };

  const fetchTokenSymbol = async (): Promise<string | null> => {
    if (!cusdcContract) {
      console.error("Contract not initialized.");
      return null;
    }
    try {
      return await cusdcContract.symbol();
    } catch (error) {
      console.error("Error fetching token symbol:", error);
      setError(error);
      return null;
    }
  };

  useEffect(() => {
    if (cusdcContract) {
      setIsLoading(false); // Set loading state before fetching
    }
  }, [cusdcContract]);

  return { fetchTokenBalance, mintTokens, fetchTokenSymbol, isLoading, error };
};

export default useCusdcContract;
