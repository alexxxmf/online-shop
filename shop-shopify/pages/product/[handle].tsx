import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import ProductPageContent from "../../components/ProductPageContent";
import { client } from "../../services";
import { PRODUCTS_ALL, PRODUCT } from "../../services/queries";
import {
  ProductByHandle as ProductByHandleData,
  ProductByHandleVariables,
  ProductByHandle_productByHandle as Product,
} from "../../services/queries/__generated__/ProductByHandle";
import { ProductsAll as ProductsData } from "../../services/queries/__generated__/ProductsAll";

interface Params extends ParsedUrlQuery {
  handle: string;
}

interface ProductStaticProps {
  product: Product | null;
}

const ProductPage: NextPage<ProductStaticProps> = ({ product }) => {
  return <div>{product && <ProductPageContent product={product} />}</div>;
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

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ProductStaticProps,
  Params
> = async ({ params }) => {
  const response = await client.query<
    ProductByHandleData,
    ProductByHandleVariables
  >({
    query: PRODUCT,
    variables: { handle: params ? params.handle : "" },
  });

  const product = response.data.productByHandle;

  return {
    props: {
      product,
    },
  };
};
