import useCollateralTokenContract from "@/hooks/contracts/useCollateralTokenContract";
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
import { JsonRpcApiProvider } from "ethers";
import { useState } from "react";
import addresses from "@/utils/addresses";

const CreateBidModal = () => {
  const {cusdcAddress, collateralTokenAddress} = addresses.networks.linea_sepolia;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tokenContract, setTokenContract] = useState("");
  const [amount, setAmount] = useState("");
  const [nftContract, setNftContract] = useState("");
  const [tokenId, setTokenId] = useState("");
  const {approve} = useCollateralTokenContract();
  const { createBid} = usePlatformContract();

  const handleCreateBid = async () => {
    try {
      await approve();
      await createBid(
        cusdcAddress,
        amount,
        collateralTokenAddress,
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
