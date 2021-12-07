import { Products as ProductsData } from "../services/queries/__generated__/Products";
import ProductCard from "./ProductCard";

interface ProductListProps {
  productsData: ProductsData;
}

const ProductList = ({ productsData }: ProductListProps) => {
  const products = productsData.collectionByHandle?.products.edges;
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Products</h2>
        <div className="grid grod-cols-1 gap-y-10 gap-x-6">
          {products?.map((product) => {
            return <ProductCard key={product.node.id} product={product.node} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
