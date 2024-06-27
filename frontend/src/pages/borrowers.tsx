import { Flex, Heading } from "@chakra-ui/react";
import styles from "@/styles/Home.module.css";
import { useSDK } from "@metamask/sdk-react";
import ManageBidModal from "@/components/ManageBidsModal";

const Borrowers: React.FC = () => {
  // can use later to show moodal when disconnected
  const { connected } = useSDK();

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
      <Heading
        style={{ color: "white" }}
        as="h1"
        size="xl"
        noOfLines={1}
        mt={19}
      >
        Borrowers
      </Heading>
      <ManageBidModal />
    </Flex>
  );
};

export default Borrowers;
