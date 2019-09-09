import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from '@firebase/app'
import Main from './Main';
import { connect } from 'react-redux'
import { alreadyLogin, notLoginYet } from '../Actions'

class AppInit extends Component {
    componentDidMount(){
        var firebaseConfig = {
            apiKey: "AIzaSyCa-06eBHcP11km4GxmlBOUkniXBDPKxfo",
            authDomain: "instagrin-b7565.firebaseapp.com",
            databaseURL: "https://instagrin-b7565.firebaseio.com",
            projectId: "instagrin-b7565",
            storageBucket: "instagrin-b7565.appspot.com",
            messagingSenderId: "724964408659",
            appId: "1:724964408659:web:27b0310e214d6ecf"
          };
          // Initialize Firebase
          if(!firebase.apps.length){
              firebase.initializeApp(firebaseConfig);
          }
          firebase.auth().onAuthStateChanged((user) => {
              if(user){
                  this.props.alreadyLogin({ user })
              }else{
                  this.props.notLoginYet()
              }
          })
    }
    render() {
        return (
        <Main />
        )
    }
}

export default connect(null, { alreadyLogin, notLoginYet })(AppInit);