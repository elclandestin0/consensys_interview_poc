import { Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import styles from "@/styles/Home.module.css";
import MetaMaskConnect from "@/components/MetaMaskConnect";
import { useSDK } from "@metamask/sdk-react";
import { useEffect } from "react";

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
        <Grid templateColumns="repeat(1, 1fr)" gap={10} mt={10}>
          <Button
            colorScheme={"pink"}
            p={4}
            onClick={() => {
              console.log("C");
            }}
            style={{ width: "300px" }}
          >
            <Text>Create Bid</Text>
          </Button>
          <Button
            variant="outline"
            colorScheme={"pink"}
            p={4}
            onClick={() => {
              console.log("B");
            }}
          >
            <Text>Check Bids</Text>
          </Button>
        </Grid>
      )}
    </Flex>
  );
};

export default Home;
