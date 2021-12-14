import { gql } from "@apollo/client";

export const CHECKOUT_CREATE = gql`
  mutation CheckoutCreate($variantId: ID!, $quantity: Int!) {
    checkoutCreate(
      input: { lineItems: [{ variantId: $variantId, quantity: $quantity }] }
    ) {
      checkout {
        id
        webUrl
      }
    }
  }
`;
