import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  query Products {
    collectionByHandle(handle: "frontpage") {
      title
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCTS_ALL = gql`
  query ProductsAll {
    products(first: 250) {
      edges {
        node {
          id
          handle
        }
      }
    }
  }
`;
