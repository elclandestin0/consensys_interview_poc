import { Box, Flex, Text, Stack, Button } from "@chakra-ui/react";

const MintButton = ({ token, onMint }) => {
  return (
    <Button
      colorScheme="teal"
      onClick={() => onMint(token.address, token.abi)}
      mb={4}
      width="100%"
    >
      Mint {token.symbol} token
    </Button>
  );
};

export const MintButtonList = ({ tokens, onMint }) => {
  return (
    <Stack spacing={4}>
      {tokens.map((token, index) => (
        <MintButton key={index} token={token} onMint={onMint} />
      ))}
    </Stack>
  );
};