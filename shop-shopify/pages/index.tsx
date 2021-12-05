import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { client } from "../services";
import { PRODUCTS } from "../services/queries";
import { Products as ProductsData } from "../services/queries/__generated__/Products";
import styles from "../styles/Home.module.css";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType, GetStaticPropsResult } from "next";

interface HomePageStaticProps {
  products: ProductsData;
}

const Home: NextPage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log("products", products);
  return <div className="text-3xl">Test tailwind</div>;
};

export default Home;

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<HomePageStaticProps>
> => {
  const response = await client.query({ query: PRODUCTS });

  const { data } = response;
  return {
    props: {
      products: data,
    },
  };
};

// https://github.com/vercel/next.js/discussions/10946
// https://stackoverflow.com/questions/65078245/how-to-make-next-js-getstaticprops-work-with-typescript
