
import React from 'react';
import Downshift from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
    query SEARCH_ITEMS_QUERY($searchTerm: String!) {
        items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] }) {
            id
            image
            title
        }
    }
`;

class AutoComplete extends React.Component {
    state = {
        items: [],
        loading: false
    }

    onChange = debounce(async (e, client) => {
        console.log("Searching...")
        this.setState({loading: true})
        const response = await client.query({
            query: SEARCH_ITEMS_QUERY,
            variables: {
                searchTerm: e.target.value
            }
        })

        this.setState({loading: false, items: response.data.items})
    }, 350);

    render() {
        return (
            <SearchStyles>
                <div>
                    <ApolloConsumer>
                        {(client) => (
                            <input
                                type="search"
                                onChange={e => {
                                    e.persist();
                                    this.onChange(e, client);
                                }}
                            />
                        )}
                        
                    </ApolloConsumer>
                    <DropDown>
                        {
                            this.state.items.map(item => {
                                console.log(item)
                                return (
                                    <DropDownItem key={item.id}>
                                        <img width="50" src={item.image} alt={item.title} />
                                            {item.title}
                                            aaa
                                    </DropDownItem>
                                )
                            }
                        )}
                    </DropDown>
                </div>
            </SearchStyles>
        )
    }
}

export default AutoComplete;