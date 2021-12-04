/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Products
// ====================================================

export interface Products_collectionByHandle_products_edges_node_images_edges_node {
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

export interface Products_collectionByHandle_products_edges_node_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: Products_collectionByHandle_products_edges_node_images_edges_node;
}

export interface Products_collectionByHandle_products_edges_node_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: Products_collectionByHandle_products_edges_node_images_edges[];
}

export interface Products_collectionByHandle_products_edges_node {
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
   * List of images associated with the product.
   */
  images: Products_collectionByHandle_products_edges_node_images;
}

export interface Products_collectionByHandle_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of ProductEdge.
   */
  node: Products_collectionByHandle_products_edges_node;
}

export interface Products_collectionByHandle_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: Products_collectionByHandle_products_edges[];
}

export interface Products_collectionByHandle {
  __typename: "Collection";
  /**
   * The collection’s name. Limit of 255 characters.
   */
  title: string;
  /**
   * List of products in the collection.
   */
  products: Products_collectionByHandle_products;
}

export interface Products {
  /**
   * Find a collection by its handle.
   */
  collectionByHandle: Products_collectionByHandle | null;
}
