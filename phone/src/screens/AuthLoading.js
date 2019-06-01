import React, { Component } from 'react';
import { Container, Spinner } from "native-base";

class AuthLoading extends Component {

    render() {
        return (
            <Container style={ { justifyContent: 'center' } }>
                <Spinner size={ 'large' } color={ 'black' } />
            </Container>
        );
    }
}

export default AuthLoading;