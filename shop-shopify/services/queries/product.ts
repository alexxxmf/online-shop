import { gql } from "@apollo/client";

export const PRODUCT = gql`
  query ProductByHandle($handle: String) {
    productByHandle(handle: $handle) {
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
          }
        }
      }
    }
  }
`;
