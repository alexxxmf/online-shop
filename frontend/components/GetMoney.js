import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($token: String!) {
        createOrder(token: $token) {
            id
            charge
            total
            items {
                id
                title
            }
        }
    }
`;

class GetMoney extends React.Component {
    onToken = (response, createOrder) => {
        console.log(response)
        createOrder({
            variables: {
              token: response.id,
            },
          }).catch(error => {
            alert(error.message);
        });
    }

    render() {
        return (
            <User>
                {({ data: { me } }) => (
                    <Mutation
                        mutation={CREATE_ORDER_MUTATION}
                        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                    >
                        {(createOrder) => (
                            <StripeCheckout
                                amount={calcTotalPrice(me.cart)}
                                name="online-shop"
                                image={me.cart[0].item && me.cart[0].item.image}
                                stripeKey="pk_test_RfJyIyeHfpMFVVbrkJqaP4dN"
                                currency="USD"
                                email={me.email}
                                token={response => this.onToken(response, createOrder)}
                            >
                                {this.props.children}
                            </StripeCheckout>
                        )}
                    </Mutation>
                )}
            </User>
        )
    }
}

export default GetMoney;