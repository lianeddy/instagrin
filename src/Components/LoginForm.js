import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input, Icon, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable';
import { 
    emailLoginChanged, 
    passwordLoginChanged, 
    loginUser } from '../Actions'
import { StackActions, NavigationActions } from 'react-navigation'

class LoginForm extends Component{
    state = {
        passHidden: true
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

    onBtnLoginPress = () => {
        this.props.loginUser(
            this.props.email,
            this.props.password,
        )
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

    render(){
        const { containerStyle, inputStyle, h3Style } = styles
        if(this.props.checkedAuth && !this.props.user){
            return(
                <View style={containerStyle}>
                <Animatable.Text animation={'fadeInDown'}>
                    <Text h3 style={h3Style}>Instagrin</Text>
                </Animatable.Text>
                {/* <Animatable.View animation={'swing'} iterationCount={'infinite'} style={inputStyle}> */}
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
                            onChangeText={(text) => this.props.emailLoginChanged(text)}
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
                        onChangeText={(text) => this.props.passwordLoginChanged(text)}
                        />
                    </View>
                {/* </Animatable.View> */}
                {this.renderError()}
                {/* <Button title='test' onPress={() => console.log('test')} /> */}
                <Button
                    icon={{
                        name:'chevron-right',
                        size:15,
                        color:'white'
                    }}
                    title="Login"
                    loading={this.props.loading}
                    containerStyle={{ width: '95%', marginBottom: 10 }}
                    onPress={this.onBtnLoginPress}
                    />
                <Button
                    icon={{
                        name: "accessibility",
                        size: 15,
                        color: "white"
                    }}
                    title="Register"
                    containerStyle={{ width: '95%' }}
                    onPress={() => this.props.navigation.navigate('Register')}
                    />
            </View>
        )}
        return (
            <View style={containerStyle}>
                <Animatable.Text animation={'bounce'} iterationCount={'infinite'} >
                    <Text h3 h3Style={{ color: '#4388d6' }}>Authenticating ... </Text>
                </Animatable.Text>
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

const mapStateToProps = ({ loginForm, auth }) => {
    return{
        email: loginForm.email,
        password: loginForm.password,
        loading: loginForm.loading,
        error: loginForm.error,
        user: auth.user,
        checkedAuth: auth.checkedAuth
    }
}

export default connect(mapStateToProps, {
    emailLoginChanged, 
    passwordLoginChanged, 
    loginUser
})(LoginForm)