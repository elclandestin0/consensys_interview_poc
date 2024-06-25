import { Flex, Card, Heading } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useMetaMask } from "@/contexts/MetaMaskContext";
import MetaMaskConnect from "@/components/MetaMaskConnect";

const Home: React.FC = () => {
  const { isConnected } = useMetaMask();

  return (
    <Flex
      className={styles.main}
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
      p={4}
    >
      <img
        src="https://asset.brandfetch.io/idUXBRZHw0/idIDvhq9nr.jpeg"
        alt="Logo"
        style={{ width: "200px", borderRadius: "20px" }}
      />
      <Heading as="h1" size="xl" noOfLines={1} mt={19}>
        NFT Collateralized Lending Platform
      </Heading>
      {!isConnected ?? <MetaMaskConnect />}
      {isConnected ?? (
        <Heading as="h1" size="lg" noOfLines={1} mt={19}>
          Connected
        </Heading>
      )}
    </Flex>
  );
};

export default Home;
