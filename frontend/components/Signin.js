import React, {  Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`;

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            email: ''
        }
    }

    saveToState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <Mutation mutation={SIGNIN_MUTATION} variables={this.state} refetchQueries={[{query: CURRENT_USER_QUERY}]}>
                {(signup, { error, loading }) => {
                return (<Form method="post" onSubmit={async (e) => {
                    e.preventDefault();
                    await signup();
                }}>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <h2>Sign up for an account</h2>
                        <Error error={error} />
                        <label htmlFor="email">
                            Email
                            <input
                                type="text"
                                name="email"
                                placeholder="email"
                                value={this.state.email}
                                onChange={this.saveToState}
                            />
                        </label>
                        <label htmlFor="password">
                            Password
                            <input
                                type="text"
                                name="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.saveToState}
                            />
                        </label>
                        <button type="submit">Sign In!</button>
                    </fieldset>
                </Form>)
            }}
            </Mutation>
        )
    }
}

export default Signin;