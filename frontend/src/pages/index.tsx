import { Flex, Card, Heading } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MetaMaskConnect from "@/components/MetaMaskConnect";
import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const { connected } = useSDK();

  useEffect(() => {
    console.log(connected);
  }, [connected]);

  return (
    <Flex
      className={styles.main}
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
      p={4}
      style={{ backgroundColor: "purple" }}
    >
      <img
        src="https://asset.brandfetch.io/idUXBRZHw0/idIDvhq9nr.jpeg"
        alt="Logo"
        style={{ width: "200px", borderRadius: "20px" }}
      />
      <Heading
        style={{ color: "white" }}
        as="h1"
        size="xl"
        noOfLines={1}
        mt={19}
      >
        NFT Collateralized Lending Platform
      </Heading>
      {!connected && <MetaMaskConnect />}
      {connected && (
        <Heading
          as="h1"
          size="lg"
          noOfLines={1}
          mt={19}
          color="#aaff00"
        >
          Connected
        </Heading>
      )}
    </Flex>
  );
};

export default Home;
