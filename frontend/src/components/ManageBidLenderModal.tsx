import React from "react";
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
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { ethers, JsonRpcApiProvider } from "ethers";
import usePlatformContract, {
  Bid,
} from "@/hooks/contracts/usePlatformContract";
import useCusdcContract from "@/hooks/contracts/useCusdcContract";
import { useRouter } from "next/router";

interface PayLoanModalProps {
  bid: Bid | null;
}

const ManageBidLenderModal: React.FC<PayLoanModalProps> = ({ bid }) => {
  const { acceptBid } = usePlatformContract();
  const { approve } = useCusdcContract();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const handleAcceptBid = async () => {
    console.log("Paying loan for bid:", bid);
    await approve(bid?.askAmount);
    console.log(Number(bid?.bidId));
    await acceptBid(Number(bid?.bidId))
  };

  if (!bid) return null;

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        <Text p="4" fontSize="16px">
          View
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="#27405d">
          <ModalHeader color="white">Lend</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody color="white">
            <FormControl mb={4}>
              <FormLabel htmlFor="premium-investment" color="white">
                Token Contract
                <Text fontSize="md" color="gray.400">
                  {bid.tokenContract}
                </Text>
              </FormLabel>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="premium-investment" color="white">
                Ask Amount
                <Text fontSize="md" color="gray.400">
                  {ethers.formatUnits(bid.askAmount, 6)}
                </Text>
              </FormLabel>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="premium-investment" color="white">
                NFT Contract
                <Text fontSize="md" color="gray.400">
                  {bid.nftContract}
                </Text>
              </FormLabel>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="premium-investment" color="white">
                Token ID
                <Text fontSize="md" color="gray.400">
                  {bid.tokenId.toString()}
                </Text>
              </FormLabel>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAcceptBid}>
              {router.pathname === "/lenders" ? "Lend" : "Repay"}
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

export default ManageBidLenderModal;
