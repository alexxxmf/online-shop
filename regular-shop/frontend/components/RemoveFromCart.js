import React, {  Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Mutation} from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
    mutation removeFromCart($id: ID!) {
        removeFromCart(id: $id) {
            id
        }
    }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends React.Component {
    // this.props.update handler gets called as soon as we get a response from that mutation
    update = (cache, payload) => {
      console.log("Removing from cart...");
      const data = cache.readQuery({ query: CURRENT_USER_QUERY });
      console.log(data);
      const cartItemId = payload.data.removeFromCart.id;
      data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
      cache.writeQuery({ query: CURRENT_USER_QUERY, data })
    }

    // https://www.apollographql.com/docs/react/features/optimistic-ui
    // optimisticResponse
    render() {
        return (
          <Mutation
            mutation={REMOVE_FROM_CART_MUTATION}
            variables={{id: this.props.id}}
            update={this.update}
            optimisticResponse={{
              __typename: 'Mutation',
              removeFromCart: {
                __typename: 'CartItem',
                id: this.props.id
              }
            }}
          >
            {(removeFromCart, { loading, error }) => (
              <BigButton
                title="Delete item"
                disabled={loading}
                onClick={() => {
                  removeFromCart().catch(error => alert(err.message));
                }}
              >
                &times;
              </BigButton>
            )}
          </Mutation>
      )
    }
}

export default RemoveFromCart;