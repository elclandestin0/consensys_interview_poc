import React from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link"; // Import Next.js Link component
import { useRouter } from "next/router";
import SettingsModal from "./SettingsModal";

const NavBar = () => {
  const router = useRouter();
  return (
    <Flex
      bg="#303261"
      color="white"
      justifyContent="space-between"
      alignItems="center"
      p={4}
    >
      <Box
        fontSize="48px"
        fontWeight="bold"
        onClick={() => {
          router.push("/");
        }}
      >
        <img
          src="https://asset.brandfetch.io/idUXBRZHw0/idIDvhq9nr.jpeg"
          alt="Logo"
          style={{ width: "48px", borderRadius: "20px" }}
        />
      </Box>
      <Flex>
        <Button
          colorScheme="teal"
          variant="text"
          onClick={() => {
            router.push("/borrowers");
          }}
        >
          <Text
            p="4"
            fontSize="16px"
            _hover={{
              textDecoration: "none",
              bg: "blue.800",
              borderRadius: "10px",
            }}
          >
            Borrowers
          </Text>
        </Button>
        <Button
          colorScheme="teal"
          variant="text"
          onClick={() => {
            router.push("/lenders");
          }}
        >
          <Text
            p="4"
            fontSize="16px"
            _hover={{
              textDecoration: "none",
              bg: "blue.800",
              borderRadius: "10px",
            }}
          >
            Lenders
          </Text>
        </Button>
        <SettingsModal />
      </Flex>
    </Flex>
  );
};

export default NavBar;
