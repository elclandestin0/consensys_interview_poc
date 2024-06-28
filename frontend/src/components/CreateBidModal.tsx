import usePlatformContract from "@/hooks/contracts/usePlatformContract";
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
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

const CreateBidModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tokenContract, setTokenContract] = useState("");
  const [amount, setAmount] = useState("");
  const [nftContract, setNftContract] = useState("");
  const [tokenId, setTokenId] = useState("");
  const { createBid } = usePlatformContract();

  const handleCreateBid = async () => {
    try {
      await createBid(
        "0x46F3798266bF6c80a9aD455a5DaacEd4cc19FE35",
        amount,
        nftContract,
        tokenId
      );
    } catch (err) {
      console.error("Error in handleCreateBid:", err);
    }
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        <Text p="4" fontSize="16px">
          Create Bid
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="#27405d">
          <ModalHeader color="white">Create Bid</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody color="white">
            <FormControl mb={4}>
              <FormLabel htmlFor="amount" color="white">
                Amount requested
              </FormLabel>
              <Input
                id="amount"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                color="white"
                focusBorderColor="pink.400"
                fontSize="xl"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="nft-contract" color="white">
                NFT Contract to stake
              </FormLabel>
              <Input
                id="nft-contract"
                placeholder="0x..."
                value={nftContract}
                onChange={(e) => setNftContract(e.target.value)}
                color="white"
                focusBorderColor="pink.400"
                fontSize="xl"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="token-id" color="white">
                Token ID
              </FormLabel>
              <Input
                id="token-id"
                placeholder="Token ID"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                type="number"
                color="white"
                focusBorderColor="pink.400"
                fontSize="xl"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleCreateBid}>
              Stake NFT & Add Bid
            </Button>
            <Button variant="ghost" onClick={onClose} color="red" ml={3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateBidModal;
