// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client, PRODUCT_VARIANT_AVAILABILITY } from "../../services";
import {
  ProductVariantAvailability as ProductVariantAvailabilityData,
  ProductVariantAvailabilityVariables,
} from "../../services/queries/__generated__/ProductVariantAvailability";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ProductVariantAvailabilityData>
) => {
  const {
    query: { handle },
  } = req;

  const response = await client.query<
    ProductVariantAvailabilityData,
    ProductVariantAvailabilityVariables
  >({
    query: PRODUCT_VARIANT_AVAILABILITY,
    variables: { handle: handle as string },
    // This is important as we need to avoid cache when checking quantities that could rapidly change
    // better to rely primarily on the network
    fetchPolicy: "network-only",
  });

  if (response.data) {
    return res.json(response.data);
  } else {
    throw new Error("Products not fetched");
  }
};

export default handler;
