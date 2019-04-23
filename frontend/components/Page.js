import React, { Component } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Meta from '../components/Meta';
import styled from 'styled-components';

const MyButton = styled.button`
    background: red;
    font-size: 100px;
`;

class Page extends Component {
    render() {
        return (
            <div>
                <Meta/>
                <Header/>
                {this.props.children}
                <MyButton>
                    sadada
                </MyButton>
            </div>
        );
    }
}

export default Page;