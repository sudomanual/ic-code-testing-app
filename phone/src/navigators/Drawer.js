import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Text } from 'native-base';

class Drawer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content >
                    <Text>Menu</Text>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Drawer);