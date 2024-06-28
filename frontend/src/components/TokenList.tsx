import useERC721 from "@/hooks/contracts/useERC721";
import { Box, Flex, Text, Stack } from "@chakra-ui/react";
import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";

const TokenInfo = (token: any) => {
  const [balance, setBalance] = useState(null);
  const { approvedTokens, fetchBalance } = useERC721();
  const { account } = useSDK();

  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (approvedTokens.length > 0) {
        const balance = await fetchBalance(token.token.address, token.token.abi);
        setBalance(balance);
      }
      console.log(token);
    }; 

    fetchTokenBalance();
  }, [approvedTokens, fetchBalance, account]);

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden" mb={4}>
      <Flex justifyContent="space-between">
        <Text>Token: {token.token.symbol}</Text>
      </Flex>
      <Text mt={2}>Balance: {balance}</Text>
    </Box>
  );
};

export const TokenList = ({ tokens }) => {
  return (
    <Stack spacing={4}>
      {tokens.map((token, index) => (
        <TokenInfo key={index} token={token} />
      ))}
    </Stack>
  );
};
