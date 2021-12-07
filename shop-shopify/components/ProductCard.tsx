import Link from "next/link";
import Image from "next/image";
import { Products_collectionByHandle_products_edges_node } from "../services/queries/__generated__/Products";

interface ProductCardProps {
  product: Products_collectionByHandle_products_edges_node;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { handle, title } = product;

  const { altText, originalSrc } = product.images.edges[0].node;

  return (
    <Link href={`/product/${handle}`}>
      <a className="group">
        <div className="w-full bg-gray-200 rounded-3xl overflow-hiden">
          <div className="relative group-hover:opacity-75 h-72">
            <Image
              src={originalSrc}
              alt={altText ?? ""}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
