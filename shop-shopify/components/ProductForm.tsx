import { useState } from "react";
import { ProductByHandle_productByHandle as Product } from "../services/queries/__generated__/ProductByHandle";
import { priceFormatter } from "../utils";
import ProductOptions from "./ProductOptions";

interface ProductPageContentProps {
  product: Product;
}

const ProductForm = ({ product }: ProductPageContentProps) => {
  const allVariantOptions = product.variants.edges?.map((variant) => {
    const allOptions: { [key: string]: any } = {};

    console.log("product", product);

    variant.node.selectedOptions.map((item) => {
      const name = item.name;
      allOptions[name] = item.value;
    });

    return {
      id: variant.node.id,
      // title: variant.node.product.title,
      handle: variant.node.product.handle,
      image: variant.node.image?.originalSrc,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.price,
      variantQuantity: 1,
    };
  });

  const defaultValues: { [key: string]: string } = {};

  product.options.map((item) => {
    defaultValues[item.name] = item.values[0];
  });

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);

  const setOptions = (name: string, value: string) => {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <span className="pb-6">
        {priceFormatter.format(product.variants.edges[0].node.price)}
      </span>
      {product.options.map(({ name, values }) => {
        return (
          <ProductOptions
            key={name}
            name={name}
            values={values}
            selectedOptions={selectedOptions}
            setOptions={setOptions}
          />
        );
      })}
      <button className="bg-black rounded-lg text-white px-2 py-3 hover:bg-gray-800">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductForm;
