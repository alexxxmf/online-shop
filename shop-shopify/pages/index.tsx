import type { NextPage } from "next";
import { client } from "../services";
import { PRODUCTS } from "../services/queries";
import { Products as ProductsData } from "../services/queries/__generated__/Products";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import ProductList from "../components/ProductList";
import Hero from "../components/Hero";
import Head from "next/head";

interface HomePageStaticProps {
  products: ProductsData;
}

const Home: NextPage<HomePageStaticProps> = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <title>Super Shop</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          httpEquiv="Content-Type"
          content="text/html; charset=ISO-8859-1"
        />
        <meta name="description" content="Shop with the latest trends" />
        <meta property="og:title" content="Super Shop" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.supershop.com" />
        <meta
          property="og:image"
          content="https://www.supershop.co/share.png"
        />
        <meta property="og:description" content="Shop with the latest trends" />
        <meta property="og:site_name" content="Super Shop" />
      </Head>
      <Hero />
      <ProductList productsData={products} />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomePageStaticProps> = async () => {
  const response = await client.query<ProductsData>({ query: PRODUCTS });

  const { data } = response;
  return {
    props: {
      products: data,
    },
  };
};

// https://github.com/vercel/next.js/discussions/10946
// https://www.vitamindev.com/next-js/getstaticprops-getstaticpaths-typescript/
