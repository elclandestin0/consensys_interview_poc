import { MetaMaskProvider } from "@metamask/sdk-react";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import NavBar from "@/components/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Consensys PoC NFT Lending App",
          url: "https://localhost:3000",
        },
        infuraAPIKey: "cewdkfj99ifaos",
      }}
    >
      <ChakraProvider>
        <NavBar />
        <Component {...pageProps} />
      </ChakraProvider>
    </MetaMaskProvider>
  );
}
