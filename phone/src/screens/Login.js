import React, { Component } from "react"
import { KeyboardAvoidingView } from "react-native"
import {
    Container,
    Button,
    Text,
    Form,
    Item as FormItem,
    Input,
    Label,
    Title
} from "native-base"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as loginActions from "../actions/login"
import * as authActions from "../actions/auth"
import styles from "../styles/authScreen"

const initialState = {
    username: "",
    password: ""
}

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = initialState;
    }

    handleLogin() {
        const { login, navigation, resetLogin, updateAuth }  = this.props
        const { username, password } = this.state
        login(username, password, navigation, ({user}) => {
            this.setState(initialState);
            resetLogin();
            updateAuth(user);
        })
    }

    render() {
        const { navigation, busy, errors, resetLogin } = this.props
        const { username, password } = this.state
        return (
            <Container style={styles.container}>
                <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior="padding" >
                    <Form style={styles.form}>
                        <Title style={styles.title}>
                            IC Code Test
                        </Title>
                        <Text style={styles.subTitle}>
                            Login Screen
                        </Text>
                        <FormItem floatingLabel style={styles.username} error={errors.username}>
                            <Label>Username</Label>
                            <Input onChangeText={(username) => this.setState({username})}
                                   value={username}
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   disabled={busy} />
                        </FormItem>
                        <FormItem floatingLabel style={styles.password} error={errors.password}>
                            <Label>Password</Label>
                            <Input secureTextEntry={true}
                                   onChangeText={(password) => this.setState({password})}
                                   value={password}
                                   disabled={busy} />
                        </FormItem>
                        <Button full
                                primary
                                style={styles.mainButton}
                                onPress={() => this.handleLogin()}
                                disabled={busy} >
                            <Text> Login </Text>
                        </Button>
                        <Button full
                                light
                                secondary
                                onPress={() => {
                                    this.setState(initialState);
                                    resetLogin();
                                    navigation.navigate("Register")
                                }}
                                disabled={busy} >
                            <Text> Sign Up </Text>
                        </Button>
                    </Form>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ busy: state.login.busy,  errors: state.login.errors })

const mapDispatchToProps = dispatch => bindActionCreators({ ...loginActions, ...authActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)