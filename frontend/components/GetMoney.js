import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

class GetMoney extends React.Component {
    onToken = (response) => {
        console.log(response)
    }

    render() {
        return (
            <User>
                {({ data: { me } }) => (
                    <StripeCheckout
                        amount={calcTotalPrice(me.cart)}
                        name="online-shop"
                        image={me.cart[0].item && me.cart[0].item.image}
                        stripeKey="pk_test_RfJyIyeHfpMFVVbrkJqaP4dN"
                        currency="USD"
                        email={me.email}
                        token={response => this.onToken(response)}
                    >
                        {this.props.children}
                    </StripeCheckout>
                )}
            </User>
        )
    }
}

export default GetMoney;