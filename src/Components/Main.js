import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginForm from './LoginForm';
import Register from './RegisterForm';
import MainMenu from './MainMenu'

export default createAppContainer(createStackNavigator(
    {
        Login: {
            screen: LoginForm
        },
        Register: {
            screen: Register
        },
        MainMenu: {
            screen: ({ navigation }) => <MainMenu screenProps={{ rootStackNavigator: navigation }} />
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
));