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
import * as registerActions from "../actions/register"
import * as loginActions from "../actions/login"
import * as authActions from "../actions/auth"
import styles from "../styles/authScreen"
import { toastError } from "../common/toaster"

const initialState = {
    username: "",
    password: "",
    confirmPassword: ""
}

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = initialState
    }

    handleRegister() {
        const { register, login, navigation, updateRegisterErrors, errors, resetRegister, updateAuth }  = this.props
        const { username, password, confirmPassword } = this.state
        if(confirmPassword != password) {
            errors.confirmPassword = true;
            updateRegisterErrors(errors)
            toastError("Please confirm your password!")
            return;
        }
        register(username, password, () => {
            login(username, password, navigation, ({user}) => {
                this.setState(initialState)
                resetRegister()
                updateAuth(user)
            })
        })
    }

    render() {
        const { navigation, busy, errors, resetRegister } = this.props
        const { username, password, confirmPassword } = this.state
        return (
            <Container style={styles.container}>
                <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior="padding" >
                    <Form style={styles.form}>
                        <Title style={styles.title}>
                            IC Code Test
                        </Title>
                        <Text style={styles.subTitle}>
                            Register Screen
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
                        <FormItem floatingLabel style={styles.confirmPassword} error={errors.confirmPassword}>
                            <Label>Confirm Password</Label>
                            <Input secureTextEntry={true}
                                   onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                                   value={confirmPassword}
                                   disabled={busy} />
                        </FormItem>
                        <Button full
                                primary
                                style={styles.mainButton}
                                onPress={() => this.handleRegister()}
                                disabled={busy} >
                            <Text> Sign Up </Text>
                        </Button>
                        <Button full
                                light
                                secondary
                                onPress={() => {
                                    this.setState(initialState)
                                    resetRegister()
                                    navigation.navigate("Login")
                                }}
                                disabled={busy} >
                            <Text> Login </Text>
                        </Button>
                    </Form>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ busy: (state.register.busy || state.login.busy), errors: state.register.errors  })

const mapDispatchToProps = dispatch => bindActionCreators({ ...registerActions, ...loginActions, ...authActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)