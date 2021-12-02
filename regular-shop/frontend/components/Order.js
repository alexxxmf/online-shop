import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id: ID!) {
        order(id: $id) {
            id
            charge
            total
            createdAt
            user {
                id
            }
            items {
                id
                title
                description
                price
                image
                quantity
            }
        }
    }
`;

class Order extends React.Component {
    render() {
        return (
            <Query
                query={SINGLE_ORDER_QUERY}
                variables={{ id: this.props.id }}
            >
                {({ data, error, loading }) => {
                    console.log(this.props.id)
                    if (error) return <Error error={error} />;
                    if (loading) return <p>Loading...</p>;
                    return (
                        <OrderStyles>
                            <Head>
                                <title>Sick Fits - Order {data.order.id}</title>
                            </Head>
                                <p>
                                    <span>Order ID:</span>
                                    <span>{this.props.id}</span>
                                </p>
                                <p>
                                    <span>Charge</span>
                                    <span>{data.order.charge}</span>
                                </p>
                                <p>
                                    <span>Date</span>
                                    <span>{data.order.createdAt}</span>
                                </p>
                                <p>
                                    <span>Order Total</span>
                                    <span>{formatMoney(data.order.total)}</span>
                                </p>
                                <p>
                                    <span>Item Count</span>
                                    <span>{data.order.items.length}</span>
                                </p>
                                <div className="items">
                                    {data.order.items.map(item => (
                                        <div className="order-item" key={item.id}>
                                            <img src={item.image} alt={item.title} />
                                            <div className="item-details">
                                                <h2>{item.title}</h2>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Each: {formatMoney(item.price)}</p>
                                                <p>Subtotal: {formatMoney(item.price * item.quantity)}</p>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                        </OrderStyles>
                    );
                }}
            </Query>
        );
    }
}

export default Order;