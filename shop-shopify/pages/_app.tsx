import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../services";
import Layout from "../components/Layout";
import ShopProvider from "../context/shopContext";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ApolloProvider client={client}>
      <ShopProvider>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </ShopProvider>
    </ApolloProvider>
  );
}

export default MyApp;
