/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductVariantAvailability
// ====================================================

export interface ProductVariantAvailability_productByHandle_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * Indicates if the product variant is available for sale.
   */
  availableForSale: boolean;
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * A globally-unique identifier.
   */
  id: string;
}

export interface ProductVariantAvailability_productByHandle_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: ProductVariantAvailability_productByHandle_variants_edges_node;
}

export interface ProductVariantAvailability_productByHandle_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: ProductVariantAvailability_productByHandle_variants_edges[];
}

export interface ProductVariantAvailability_productByHandle {
  __typename: "Product";
  /**
   * List of the product’s variants.
   */
  variants: ProductVariantAvailability_productByHandle_variants;
}

export interface ProductVariantAvailability {
  /**
   * Find a product by its handle.
   */
  productByHandle: ProductVariantAvailability_productByHandle | null;
}

export interface ProductVariantAvailabilityVariables {
  handle: string;
}
