import React, { Component } from "react"
import { connect } from "react-redux"
import { Container, Content, Title } from "native-base"
import styles from "../styles/drawer"

class Drawer extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container>
                <Content style={styles.content}>
                    <Title style={styles.title}>App Menu</Title>
                </Content>
            </Container>
        )
    }
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Drawer);