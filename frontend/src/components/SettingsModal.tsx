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
import { TokenList } from "@/components/TokenList";
import { MintButtonList } from "@/components/MintButtonList";
import {
  APPROVED_721_TOKENS,
  APPROVED_20_TOKENS,
} from "@/utils/approvedTokens";
import useCusdcContract from "@/hooks/contracts/useCusdcContract";

const SettingsModal = () => {
  const { account } = useSDK();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mintToken, fetchBalance, error } = useERC721();
  const {mintTokens} = useCusdcContract();
  const [loading, setLoading] = useState(false);

  const handleMintCollateralToken = async () => {
    setLoading(true);
    try {
      const token = APPROVED_721_TOKENS[0]; // Using the first token as an example
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
    console.log(APPROVED_721_TOKENS);
    console.log(APPROVED_20_TOKENS);
  }, [APPROVED_721_TOKENS, APPROVED_20_TOKENS]);

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
        <ModalContent backgroundColor="#27405d">
          <ModalHeader color="white">Settings</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody color="white">
            <Tabs isFitted>
              <TabList mb="1em">
                <Tab>Balance</Tab>
                <Tab>Actions</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {APPROVED_20_TOKENS.length > 0 && (
                    <TokenList tokens={APPROVED_20_TOKENS} />
                  )}
                  {APPROVED_721_TOKENS.length > 0 && (
                    <TokenList tokens={APPROVED_721_TOKENS} />
                  )}
                </TabPanel>
                <TabPanel>
                  {APPROVED_721_TOKENS.length > 0 && (
                    <MintButtonList
                      tokens={APPROVED_721_TOKENS}
                      onMint={handleMintCollateralToken}
                    />
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} color="red">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsModal;
