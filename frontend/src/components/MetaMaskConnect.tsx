// src/components/MetaMaskConnect.tsx
import { Button } from '@chakra-ui/react';
import { useSDK } from '@metamask/sdk-react';

const MetaMaskConnect: React.FC = () => {
    const { connected, sdk } = useSDK();

    return (
        <Button colorScheme="teal" onClick={()=>{sdk?.connect()}} disabled={connected} size="lg" mt={8}>
            {connected ? 'Connected' : 'Connect to MetaMask'}
        </Button>
    );
};

export default MetaMaskConnect;