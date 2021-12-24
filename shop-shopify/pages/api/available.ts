// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client, PRODUCT_VARIANT_AVAILABILITY } from "../../services";
import {
  ProductVariantAvailability as ProductVariantAvailabilityData,
  ProductVariantAvailabilityVariables,
} from "../../services/queries/__generated__/ProductVariantAvailability";

type Data = {
  availableForSale: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  client.query<
    ProductVariantAvailabilityData,
    ProductVariantAvailabilityVariables
  >({ query: PRODUCT_VARIANT_AVAILABILITY });
  res.status(200).json({ availableForSale: false });
}
