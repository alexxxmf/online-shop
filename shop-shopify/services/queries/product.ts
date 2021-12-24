import { gql } from "@apollo/client";

export const PRODUCT = gql`
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      collections(first: 1) {
        edges {
          node {
            products(first: 4) {
              edges {
                node {
                  title
                  images(first: 1) {
                    edges {
                      node {
                        originalSrc
                        altText
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            altText
            originalSrc
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            availableForSale
            selectedOptions {
              name
              value
            }
            image {
              originalSrc
              altText
            }
            title
            id
            price
            product {
              handle
              title
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_VARIANT_AVAILABILITY = gql`
  query ProductVariantAvailability($handle: String!) {
    productByHandle(handle: $handle) {
      variants(first: 10) {
        edges {
          node {
            availableForSale
            title
            id
          }
        }
      }
    }
  }
`;
