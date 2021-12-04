import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { PRODUCTS } from "../services/queries";
import { Products as ProductsData } from "../services/queries/__generated__/Products";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { data, loading, error } = useQuery<ProductsData>(PRODUCTS);
  return <div className="text-3xl">Test tailwind</div>;
};

export default Home;
