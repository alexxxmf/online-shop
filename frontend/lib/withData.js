import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // Bit for local state in apollo: https://www.apollographql.com/docs/react/essentials/local-state
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }, ) {
            // read cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            // turn the cart state into the opposite value
            const data = {
              data: { cartOpen: !cartOpen }
            };
            cache.writeData(data);
            return data;
          },
        }
      },
      defaults: {
        cartOpen: true,
      }
    }
  });
}

export default withApollo(createClient);
