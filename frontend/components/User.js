import React, {  Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const CURRENT_USER_QUERY = gql`
    query me {
        me{
            id
            email
            name
            permissions
        }
        
    }
`;

// render prop component for passing through query result
const User = props => (
    <Query {...props} query={CURRENT_USER_QUERY}>
        {payload => props.children(payload)}
    </Query>
);

export default User;
export { CURRENT_USER_QUERY };