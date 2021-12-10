import { ProductByHandle_productByHandle as Product } from "../services/queries/__generated__/ProductByHandle";

interface ProductPageContentProps {
  product: Product;
}

const ProductPageContent = ({ product }: ProductPageContentProps) => {
  return <div>{product.title}</div>;
};

export default ProductPageContent;
