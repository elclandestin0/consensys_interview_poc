import { Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import styles from "@/styles/Home.module.css";
import MetaMaskConnect from "@/components/MetaMaskConnect";
import { useSDK } from "@metamask/sdk-react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const { connected } = useSDK();
  const router = useRouter();

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
      style={{ backgroundColor: "#303261" }}
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
        <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={10}>
          <Button
            colorScheme={"pink"}
            p={4}
            onClick={() => {
              router.push('/borrowers');
            }}
            style={{ width: "300px" }}
          >
            <Text>Borrowers</Text>
          </Button>
          <Button
            variant="outline"
            colorScheme={"pink"}
            p={4}
            onClick={() => {
              router.push('/lenders');
            }}
          >
            <Text>Lenders</Text>
          </Button>
        </Grid>
      )}
    </Flex>
  );
};

export default Home;
