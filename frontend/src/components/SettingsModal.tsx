import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useERC721 from "@/hooks/contracts/useERC721";
import { useSDK } from "@metamask/sdk-react";

const SettingsModal = () => {
  const { account } = useSDK();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { approvedTokens, mintToken, fetchBalance, error } = useERC721();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);

  const handleMintCollateralToken = async () => {
    setLoading(true);
    try {
      const token = approvedTokens[0]; // Using the first token as an example
      await mintToken(token.address, token.abi);
      console.log("Minting collateral token...");
    } catch (error) {
      console.error("Error minting collateral token:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (approvedTokens.length > 0) {
        const token = approvedTokens[0]; // Using the first token as an example
        const balance = await fetchBalance(token.address, token.abi, account);
        setBalance(balance);
      }
    };

    fetchTokenBalance();
  }, [approvedTokens, fetchBalance, account]);

  return (
    <>
      <Button colorScheme="teal" variant="text" onClick={onOpen}>
        <Text
          p="4"
          fontSize="16px"
          _hover={{
            textDecoration: "none",
            bg: "blue.800",
            borderRadius: "10px",
          }}
        >
          Settings
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>Balance</Tab>
                <Tab>Actions</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {approvedTokens.length > 0 && (
                    <Box>
                      <Text>Symbol: {approvedTokens[0].symbol}</Text>
                      <Text>Balance: {balance}</Text>
                    </Box>
                  )}
                </TabPanel>
                <TabPanel>
                  <Button
                    colorScheme="teal"
                    isLoading={loading}
                    onClick={handleMintCollateralToken}
                    mb={4}
                    width="100%"
                  >
                    Mint from Collateral Token
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsModal;
