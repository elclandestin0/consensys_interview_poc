import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Icon,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { Bid } from "@/hooks/contracts/usePlatformContract";
import { useContracts } from "@/hooks/contracts/useContracts";
import ManageBidLendarModal from "./ManageBidLenderModal";

interface BidsTableProps {
  bids: Bid[];
}

const BidsTable: React.FC<BidsTableProps> = ({ bids }) => {
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const handleRowClick = (index: any) => {
    setSelectedBid(selectedBid === index ? null : index);
  };
  //   useEffect(() => {
  //     if (!investmentFundedPerSubscriber || !investmentBalance) return;
  //   }, []);

  return (
    <Box w="full">
      <Table variant="unstyled">
        <Thead>
          <Tr color="white">
            <Th>Token</Th>
            <Th>Bid requester</Th>
            <Th>Amount requested</Th>
            <Th>NFT collateral</Th>
            <Th>Token ID</Th>
            <Th>Status</Th>
            <Th>Manage Bid</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bids.map((bid: any, index: number) => (
            <React.Fragment key={index}>
              <Tr
                onClick={() => handleRowClick(index)}
                cursor="pointer"
                border="2px"
                borderColor="teal"
                backgroundColor="#27405d"
                mt={4}
              >
                <Td color="white" fontWeight="normal">
                  {bid.tokenContract}
                </Td>
                <Td color="white" fontWeight="normal">
                  {bid.from}
                </Td>
                <Td color="white" fontWeight="normal">
                  {ethers.formatUnits(bid.askAmount, 6)}
                </Td>
                <Td color="green.300" fontWeight="normal">
                  {bid.nftContract}
                </Td>
                <Td color="green.300" fontWeight="normal">
                  {bid.tokenId.toString()}
                </Td>
                <Td color="green.300" fontWeight="normal">
                  {bid.accepted == true ? "Accepted" : "Pending"}
                </Td>
                <Td>
                  <ManageBidLendarModal bid={bid}/>
                </Td>
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default BidsTable;
