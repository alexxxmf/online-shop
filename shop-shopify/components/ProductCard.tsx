import Link from "next/link";
import Image from "next/image";
import { Products_collectionByHandle_products_edges_node } from "../services/queries/__generated__/Products";
import { priceFormatter } from "../utils";

interface ProductCardProps {
  product: Products_collectionByHandle_products_edges_node;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { handle, title } = product;

  const { altText, originalSrc } = product.images.edges[0].node;

  const price = product.priceRange.minVariantPrice.amount;

  return (
    <Link href={`/product/${handle}`}>
      <a className="group">
        <div className="w-full bg-gray-200 rounded-sm overflow-hidden">
          <div className="relative group-hover:opacity-75 h-72">
            <Image
              src={originalSrc}
              alt={altText ?? ""}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-700">
          {priceFormatter.format(price)}
        </p>
      </a>
    </Link>
  );
};

export default ProductCard;
