import {useEffect, useState} from 'react';
import {useContracts} from './useContracts'; // Import your useContracts hook


const useCusdcContract = () => {
    const {cusdcContract} = useContracts();
    const [isLoading, setIsAwethLoading] = useState(true);
    const [error, setError] = useState<unknown>();

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


    useEffect(() => {
        if (cusdcContract) {
            setIsAwethLoading(false); // Set loading state before fetching
        }
    }, [cusdcContract]);

    return {fetchTokenBalance, isLoading, error};
};

export default useCusdcContract;