import { GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { client } from "../../services";
import { PRODUCTS_ALL } from "../../services/queries";
import {
  ProductByHandle as ProductByHandleData,
  ProductByHandleVariables,
  ProductByHandle_productByHandle as Product,
} from "../../services/queries/__generated__/ProductByHandle";
import { ProductsAll as ProductsData } from "../../services/queries/__generated__/ProductsAll";

const ProductPage = () => {
  return <div>ProductPage</div>;
};

export default ProductPage;

export const getStaticPaths = async () => {
  const response = await client.query<ProductsData>({ query: PRODUCTS_ALL });
  const products = response.data.products.edges ?? [];

  const paths = products.map((product) => {
    const handle = String(product.node.handle);

    return {
      params: { handle },
    };
  });

  console.log("paths", paths);
  return {
    paths,
    fallback: false,
  };
};

interface Params extends ParsedUrlQuery {
  handle: string;
}

interface StaticProps {
  product: Product | null;
}

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
  params,
}) => {
  params?.handle;
  const response = await client.query<
    ProductByHandleData,
    ProductByHandleVariables
  >({
    query: PRODUCTS_ALL,
    variables: { handle: params ? params.handle : "" },
  });
  const product = response.data.productByHandle;

  return {
    props: {
      product,
    },
  };
};
