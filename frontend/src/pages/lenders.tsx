import { Flex, Heading } from "@chakra-ui/react";
import styles from "@/styles/Home.module.css";
import { useSDK } from "@metamask/sdk-react";
import { useEffect } from "react";
import usePlatformContract from "@/hooks/contracts/usePlatformContract";
import BidsTable from "@/components/BidsTable";

const Lenders: React.FC = () => {
  const { connected } = useSDK();
  const { bids } = usePlatformContract();

  useEffect(()=>{}, [bids])

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
        All bids
      </Heading>
      <BidsTable bids={bids} />
    </Flex>
  );
};

export default Lenders;
