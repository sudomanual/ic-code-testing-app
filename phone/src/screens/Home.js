import React, { Component } from "react"
import { Container, Text, Content, View, Title } from "native-base"
import AppHeader from "./partials/AppHeader"
import AppFooter from "./partials/AppFooter"
import { bindActionCreators } from "redux"
import * as authActions from "../actions/auth"
import { connect } from "react-redux"
import styles from "../styles/home"

class Home extends Component {

    constructor(props) {
        super(props)
    }

    getUsername() {
        const { user } = this.props;
        return user && user.username ?  user.username : ""
    }

    render() {
        const { navigation, logout } = this.props
        return (
            <Container>
                <AppHeader navigation={navigation} />
                <Content>
                    <View style={styles.content}>
                        <Title style={styles.title}>IC Code Testing</Title>
                        <Text style={styles.subTitle}>Welcome {this.getUsername()} to this code testing app, first you registered and then logged in successfully. congrats!! and after that you give logout a shot. The app is using axios library to make http requests to api ran by node.js and supports jwt token. the app contains 4 screens and one menu uses ReactNavigation to navigate through the app. Finally the Api server run by docker. Enjoy!!</Text>
                    </View>
                </Content>
                <AppFooter logout={() => logout(navigation)} />
            </Container>
        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user })

const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)