import useCollateralTokenContract from "@/hooks/contracts/useCollateralTokenContract";
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
} from "@chakra-ui/react";
import { useState } from "react";

const SettingsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mint } = useCollateralTokenContract();
  const [loading, setLoading] = useState(false);
  const handleMintCollateralToken = async () => {
    setLoading(true);
    try {
      // Implement minting collateral token logic here
      // For example, interact with the smart contract to mint the token
      mint();
      console.log("Minting collateral token...");
    } catch (error) {
      console.error("Error minting collateral token:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

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
            <Button
              colorScheme="teal"
              isLoading={loading}
              onClick={handleMintCollateralToken}
              mb={4}
              width="100%"
            >
              Mint from Collateral Token
            </Button>
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
