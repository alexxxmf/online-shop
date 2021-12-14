/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CheckoutCreate
// ====================================================

export interface CheckoutCreate_checkoutCreate_checkout {
  __typename: "Checkout";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The url pointing to the checkout accessible from the web.
   */
  webUrl: any;
}

export interface CheckoutCreate_checkoutCreate {
  __typename: "CheckoutCreatePayload";
  /**
   * The new checkout object.
   */
  checkout: CheckoutCreate_checkoutCreate_checkout | null;
}

export interface CheckoutCreate {
  /**
   * Creates a new checkout.
   */
  checkoutCreate: CheckoutCreate_checkoutCreate | null;
}

export interface CheckoutCreateVariables {
  variantId: string;
  quantity: number;
}
