import type { NextPage } from "next";
import { client } from "../services";
import { PRODUCTS } from "../services/queries";
import { Products as ProductsData } from "../services/queries/__generated__/Products";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import ProductList from "../components/ProductList";

interface HomePageStaticProps {
  products: ProductsData;
}

const Home: NextPage<HomePageStaticProps> = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
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
