import Image from "next/image";
import { ProductByHandle_productByHandle as Product } from "../services/queries/__generated__/ProductByHandle";
import ProductForm from "./ProductForm";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

interface ProductPageContentProps {
  product: Product;
}

const ProductPageContent = ({ product }: ProductPageContentProps) => {
  console.log("product", product);
  const images = product.images.edges.map((image, index) => {
    return (
      <SwiperSlide key={`slide-${index}`}>
        <Image
          src={image.node.originalSrc}
          alt={image.node.altText ?? ""}
          layout="fill"
          objectFit="cover"
        />
      </SwiperSlide>
    );
  });

  SwiperCore.use([Navigation, Pagination]);

  return (
    <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
      <div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
        <div className="relative h-96 w-full">
          <Swiper
            navigation
            pagination={{ clickable: true }}
            className="h-96 rounded-2xl"
            loop={true}
            style={{
              // @ts-ignore
              "--swiper-navigation-color": "#000",
              // @ts-ignore
              "--swiper-pagination-color": "#000",
            }}
          >
            {images}
          </Swiper>
        </div>
      </div>
      <ProductForm product={product} />
    </div>
  );
};

export default ProductPageContent;
