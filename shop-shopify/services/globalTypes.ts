/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Specifies the input fields required for an attribute.
 */
export interface AttributeInput {
  key: string;
  value: string;
}

/**
 * Specifies the input fields to create a line item on a checkout.
 */
export interface CheckoutLineItemInput {
  customAttributes?: AttributeInput[] | null;
  quantity: number;
  variantId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
