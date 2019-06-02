import React, { Component } from "react"
import { Container, Spinner } from "native-base"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as authActions from "../actions/auth"
import styles from "../styles/authLoading"

class AuthLoading extends Component {

    async componentDidMount() {
        const { navigation , authCheck } = this.props
        await authCheck(navigation)
    }

    render() {
        return (
            <Container style={styles.container}>
                <Spinner size={ "large" } color={ "black" } />
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(authActions, dispatch);
}

export default connect(null, mapDispatchToProps)(AuthLoading)