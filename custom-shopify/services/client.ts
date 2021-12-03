import {
  ApolloClient,
  concat,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2021-07/graphql.json`,
  // credentials: "include",
});

const accessMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "X-Shopify-Storefront-Access-Token":
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {},
  }),
  link: concat(accessMiddleware, httpLink),
});
