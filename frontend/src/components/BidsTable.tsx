import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Icon } from "@chakra-ui/react";
import { ethers } from "ethers";
import { Bid } from "@/hooks/contracts/usePlatformContract";
import { useContracts } from "@/hooks/contracts/useContracts";

interface BidsTableProps {
  bids: Bid[];
}

const BidsTable: React.FC<BidsTableProps> = ({ bids }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (index: any) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  //   useEffect(() => {
  //     if (!investmentFundedPerSubscriber || !investmentBalance) return;
  //   }, []);

  return (
    <Box w="full">
      <Table variant="unstyled">
        <Thead>
          <Tr color="white">
            <Th fontStyle="bold">Bid ID</Th>
            <Th>Token</Th>
            <Th>Bid requester</Th>
            <Th>Amount requested</Th>
            <Th>NFT collateral</Th>
            <Th>Token ID</Th>
            <Th>Status</Th>
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
              >
                <Td color="white" fontWeight="normal">
                  Bid {index + 1}
                </Td>
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
                  {ethers.parseUnits(bid.tokenId.toString())}
                </Td>
                <Td color="green.300" fontWeight="normal">
                  {ethers.parseUnits(bid.tokenId.toString())}
                </Td>
                <Td color="green.300" fontWeight="normal">
                  {bid.accepted == true ? "Accepted" : "Pending"}
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
