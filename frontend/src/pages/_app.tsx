import { MetaMaskProvider } from "@/contexts/MetaMaskContext";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MetaMaskProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
    </MetaMaskProvider>
  );
}
