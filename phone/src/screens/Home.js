import React, { Component } from 'react';
import { Container, Text } from 'native-base'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }

    render() {
        return (
            <Container >
                <Text>Home</Text>
            </Container>
        );
    }
}

export default Home;