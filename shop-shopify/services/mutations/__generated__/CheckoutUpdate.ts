/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutLineItemInput } from "./../../globalTypes";

// ====================================================
// GraphQL mutation operation: CheckoutUpdate
// ====================================================

export interface CheckoutUpdate_checkoutLineItemsReplace_checkout {
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

export interface CheckoutUpdate_checkoutLineItemsReplace {
  __typename: "CheckoutLineItemsReplacePayload";
  /**
   * The updated checkout object.
   */
  checkout: CheckoutUpdate_checkoutLineItemsReplace_checkout | null;
}

export interface CheckoutUpdate {
  /**
   * Sets a list of line items to a checkout.
   */
  checkoutLineItemsReplace: CheckoutUpdate_checkoutLineItemsReplace | null;
}

export interface CheckoutUpdateVariables {
  lineItems: CheckoutLineItemInput[];
  checkoutId?: string | null;
}
