/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsWithCollections
// ====================================================

export interface ProductsWithCollections_productByHandle_collections_edges_node_products_edges_node_priceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface ProductsWithCollections_productByHandle_collections_edges_node_products_edges_node_priceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: ProductsWithCollections_productByHandle_collections_edges_node_products_edges_node_priceRange_minVariantPrice;
}

export interface ProductsWithCollections_productByHandle_collections_edges_node_products_edges_node_images_edges_node {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
  /**
   * A word or phrase to share the nature or contents of an image.
   */
  altText: string | null;
}

export interface ProductsWithCollections_productByHandle_collections_edges_node_products_edges_node_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: ProductsWithCollections_productByHandle_collections_edges_node_products_edges_node_images_edges_node;
}

export interface ProductsWithCollections_productByHandle_collections_edges_node_products_edges_node_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: ProductsWithCollections_productByHandle_collections_edges_node_products_edges_node_images_edges[];
}

export interface ProductsWithCollections_productByHandle_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The price range.
   */
  priceRange: ProductsWithCollections_productByHandle_collections_edges_node_products_edges_node_priceRange;
  /**
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: string;
  /**
   * The product’s title.
   */
  title: string;
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * List of images associated with the product.
   */
  images: ProductsWithCollections_productByHandle_collections_edges_node_products_edges_node_images;
}

export interface ProductsWithCollections_productByHandle_collections_edges_node_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of ProductEdge.
   */
  node: ProductsWithCollections_productByHandle_collections_edges_node_products_edges_node;
}

export interface ProductsWithCollections_productByHandle_collections_edges_node_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: ProductsWithCollections_productByHandle_collections_edges_node_products_edges[];
}

export interface ProductsWithCollections_productByHandle_collections_edges_node {
  __typename: "Collection";
  /**
   * List of products in the collection.
   */
  products: ProductsWithCollections_productByHandle_collections_edges_node_products;
}

export interface ProductsWithCollections_productByHandle_collections_edges {
  __typename: "CollectionEdge";
  /**
   * The item at the end of CollectionEdge.
   */
  node: ProductsWithCollections_productByHandle_collections_edges_node;
}

export interface ProductsWithCollections_productByHandle_collections {
  __typename: "CollectionConnection";
  /**
   * A list of edges.
   */
  edges: ProductsWithCollections_productByHandle_collections_edges[];
}

export interface ProductsWithCollections_productByHandle_images_edges_node {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
  /**
   * A word or phrase to share the nature or contents of an image.
   */
  altText: string | null;
}

export interface ProductsWithCollections_productByHandle_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: ProductsWithCollections_productByHandle_images_edges_node;
}

export interface ProductsWithCollections_productByHandle_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: ProductsWithCollections_productByHandle_images_edges[];
}

export interface ProductsWithCollections_productByHandle_options {
  __typename: "ProductOption";
  /**
   * The product option’s name.
   */
  name: string;
  /**
   * The corresponding value to the product option name.
   */
  values: string[];
  /**
   * A globally-unique identifier.
   */
  id: string;
}

export interface ProductsWithCollections_productByHandle_variants_edges_node_selectedOptions {
  __typename: "SelectedOption";
  /**
   * The product option’s name.
   */
  name: string;
  /**
   * The product option’s value.
   */
  value: string;
}

export interface ProductsWithCollections_productByHandle_variants_edges_node_image {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
  /**
   * A word or phrase to share the nature or contents of an image.
   */
  altText: string | null;
}

export interface ProductsWithCollections_productByHandle_variants_edges_node_priceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface ProductsWithCollections_productByHandle_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * List of product options applied to the variant.
   */
  selectedOptions: ProductsWithCollections_productByHandle_variants_edges_node_selectedOptions[];
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: ProductsWithCollections_productByHandle_variants_edges_node_image | null;
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The product variant’s price.
   */
  priceV2: ProductsWithCollections_productByHandle_variants_edges_node_priceV2;
}

export interface ProductsWithCollections_productByHandle_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: ProductsWithCollections_productByHandle_variants_edges_node;
}

export interface ProductsWithCollections_productByHandle_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: ProductsWithCollections_productByHandle_variants_edges[];
}

export interface ProductsWithCollections_productByHandle {
  __typename: "Product";
  /**
   * List of collections a product belongs to.
   */
  collections: ProductsWithCollections_productByHandle_collections;
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The product’s title.
   */
  title: string;
  /**
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: string;
  /**
   * Stripped description of the product, single line with HTML tags removed.
   */
  description: string;
  /**
   * List of images associated with the product.
   */
  images: ProductsWithCollections_productByHandle_images;
  /**
   * List of product options.
   */
  options: ProductsWithCollections_productByHandle_options[];
  /**
   * List of the product’s variants.
   */
  variants: ProductsWithCollections_productByHandle_variants;
}

export interface ProductsWithCollections {
  /**
   * Find a product by its handle.
   */
  productByHandle: ProductsWithCollections_productByHandle | null;
}

export interface ProductsWithCollectionsVariables {
  handle: string;
}
