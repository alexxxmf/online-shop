import { gql } from "@apollo/client";

// TODO: move CustomAttributes and CheckoutLineItemInput to a separate TS file
// and then generate gql types so that they end up in globalTypes
export const CHECKOUT_UPDATE = gql`
  type CustomAttributes {
    key: String!
    value: String!
  }

  type CheckoutLineItemInput {
    variant: ID!
    quantity: Int!
    customAttributes: CustomAttributes
  }

  mutation CheckoutUpdate(
    $lineItems: CheckoutLineItemInput
    $checkoutId: String
  ) {
    checkoutLineItemsReplace(lineItems: $lineItems, checkoutId: $checkoutId) {
      checkout {
        id
        webUrl
      }
    }
  }
`;
