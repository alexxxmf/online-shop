/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductByHandle
// ====================================================

export interface ProductByHandle_productByHandle_images_edges_node {
  __typename: "Image";
  /**
   * A word or phrase to share the nature or contents of an image.
   */
  altText: string | null;
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
}

export interface ProductByHandle_productByHandle_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: ProductByHandle_productByHandle_images_edges_node;
}

export interface ProductByHandle_productByHandle_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: ProductByHandle_productByHandle_images_edges[];
}

export interface ProductByHandle_productByHandle_options {
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

export interface ProductByHandle_productByHandle_variants_edges_node_selectedOptions {
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

export interface ProductByHandle_productByHandle_variants_edges_node_image {
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

export interface ProductByHandle_productByHandle_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * List of product options applied to the variant.
   */
  selectedOptions: ProductByHandle_productByHandle_variants_edges_node_selectedOptions[];
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: ProductByHandle_productByHandle_variants_edges_node_image | null;
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
  price: any;
}

export interface ProductByHandle_productByHandle_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: ProductByHandle_productByHandle_variants_edges_node;
}

export interface ProductByHandle_productByHandle_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: ProductByHandle_productByHandle_variants_edges[];
}

export interface ProductByHandle_productByHandle {
  __typename: "Product";
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
  images: ProductByHandle_productByHandle_images;
  /**
   * List of product options.
   */
  options: ProductByHandle_productByHandle_options[];
  /**
   * List of the product’s variants.
   */
  variants: ProductByHandle_productByHandle_variants;
}

export interface ProductByHandle {
  /**
   * Find a product by its handle.
   */
  productByHandle: ProductByHandle_productByHandle | null;
}

export interface ProductByHandleVariables {
  handle?: string | null;
}
