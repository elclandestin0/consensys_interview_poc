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
  const { acceptBid, repayLoan, defaultLoan } = usePlatformContract();
  const { approve } = useCusdcContract();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleManageBid = async () => {
    const statusLogic =
      router.pathname === "/lenders"
        ? bid.accepted
          ? "Default"
          : "Lend"
        : bid.accepted
        ? "Repay"
        : "Pending";

    console.log("Managing bid with status:", statusLogic);

    try {
      if (statusLogic === "Repay") {
        console.log("Repaying loan for bid:", bid);
        await approve(ethers.MaxUint256); // Approving a large amount
        await repayLoan(Number(bid?.bidId));
      } else if (statusLogic === "Default") {
        console.log("Defaulting loan for bid:", bid);
        await defaultLoan(Number(bid?.bidId));
      } else if (statusLogic === "Lend") {
        console.log("Lending for bid:", bid[0]);
        // await approve(bid?.askAmount);
        console.log("approved. accepting bid ...");
        await acceptBid(bid[0]);
        console.log("bid accepted");
      } else {
        console.log("Pending status, no action taken.");
      }
    } catch (err) {
      console.error("Error managing bid:", err);
    }
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
          <ModalHeader color="white">Manage Bid</ModalHeader>
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
            <Button
              colorScheme="teal"
              onClick={handleManageBid}
              isDisabled={!bid.accepted && router.pathname === "/borrowers"}
            >
              {router.pathname === "/lenders"
                ? bid.accepted
                  ? "Default"
                  : "Lend"
                : bid.accepted
                ? "Repay"
                : "Pending"}
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
