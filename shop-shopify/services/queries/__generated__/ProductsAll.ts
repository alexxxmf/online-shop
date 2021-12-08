/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsAll
// ====================================================

export interface ProductsAll_products_edges_node {
  __typename: "Product";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: string;
}

export interface ProductsAll_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of ProductEdge.
   */
  node: ProductsAll_products_edges_node;
}

export interface ProductsAll_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: ProductsAll_products_edges[];
}

export interface ProductsAll {
  /**
   * List of the shop’s products.
   */
  products: ProductsAll_products;
}
