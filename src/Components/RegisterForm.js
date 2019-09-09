import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'
import { Text, Input, Icon, Button } from 'react-native-elements'
import {
    usernameRegisterChanged,
    emailRegisterChanged,
    passwordRegisterChanged,
    conPasswordRegisterChanged,
    registerUser
} from '../Actions'

class RegisterForm extends Component{
    state={
        passHidden: true,
        conPassHidden: true
    }

    componentDidUpdate(){
        if(this.props.user){
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'MainMenu' })],
            });
            this.props.navigation.dispatch(resetAction)
        }
    }

    renderError(){
        if(this.props.error){
            return(
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ color: 'red' }}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }
    onBtnRegisterPress = () => {
        this.props.registerUser(
            this.props.email,
            this.props.username,
            this.props.password,
            this.props.conPassword
        )
    }
    render(){
        const { containerStyle, inputStyle, h3Style } = styles
        return(
            <View style={containerStyle}>
                <Text h3 style={h3Style}>Join Us!</Text>
                <View style={inputStyle}>
                    <Input
                        placeholder='Email'
                        leftIcon={
                            <Icon
                            name='email'
                            size={24}
                            color='#4388d6'
                            />
                        }
                        value={this.props.email}
                        onChangeText={(text) => this.props.emailRegisterChanged(text)}
                        />
                    <Input
                        placeholder='Username'
                        leftIcon={
                            <Icon
                            name='email'
                            size={24}
                            color='#4388d6'
                            />
                        }
                        value={this.props.username}
                        onChangeText={(text) => this.props.usernameRegisterChanged(text)}
                        />
                    <Input
                        secureTextEntry={this.state.passHidden}
                        placeholder='Password'
                        leftIcon={
                            <Icon
                            name='lock'
                            size={24}
                            color='#4388d6'
                            />
                        }
                        rightIcon={
                            <Icon
                            name='visibility'
                            size={24}
                            color='#4388d6'
                            onPress={() => this.setState({passHidden: !this.state.passHidden})}
                            />
                        }
                        value={this.props.password}
                        onChangeText={(text) => this.props.passwordRegisterChanged(text)}
                        />
                        <Input
                        secureTextEntry={this.state.conPassHidden}
                        placeholder='Confirm Password'
                        leftIcon={
                            <Icon
                            name='lock'
                            size={24}
                            color='#4388d6'
                            />
                        }
                        rightIcon={
                            <Icon
                            name='visibility'
                            size={24}
                            color='#4388d6'
                            onPress={() => this.setState({conPassHidden: !this.state.conPassHidden})}
                            />
                        }
                        value={this.props.conPassword}
                        onChangeText={(text) => this.props.conPasswordRegisterChanged(text)}
                        />
                </View>
                {this.renderError()}
                <Button
                    icon={{
                        name: "accessibility",
                        size: 15,
                        color: "white"
                    }}
                    title="Register"
                    loading={this.props.loading}
                    onPress={this.onBtnRegisterPress}
                    containerStyle={{ width: '95%' }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle : {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    inputStyle : {
        marginBottom: 50,
        marginTop: 100,
        width: '100%'
    },
    h3Style: {
        color: '#4388d6'
    }
})

const mapStatetoProps = ({ registerForm, auth }) => {
    return{
        email: registerForm.email,
        username: registerForm.username,
        password: registerForm.password,
        conPassword: registerForm.conPassword,
        loading: registerForm.loading,
        error: registerForm.error,
        user: auth.user
    }
}

export default connect(mapStatetoProps, {
    usernameRegisterChanged,
    emailRegisterChanged,
    passwordRegisterChanged,
    conPasswordRegisterChanged,
    registerUser
})(RegisterForm)