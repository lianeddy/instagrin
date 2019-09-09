import React, { Component } from 'react';
import { View, Text, Platform, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import firebase from '@firebase/app';
import '@firebase/database';
import '@firebase/auth';
import _ from 'lodash'
import CardImage from './Card'





class Home extends Component{
    state = {
        postList: []
    }

    componentDidMount(){
        firebase.database().ref(`/posts`)
        .on('value', snapshot => {
            // console.log(snapshot.val())
            var postList = []
            _.map(snapshot.val(), (val, id) => {
                firebase.database().ref(`/users/${val.userId}`)
                .once('child_added', (snapshot) => {
                    var value = snapshot.val()
                    postList.push({
                        ...val,
                        id, 
                        username: value.displayName,
                        userPhoto: value.photoURL
                    })
                    this.setState({ postList })
                })
            })
        })
    }

    renderPostList = () => {
        var jsx = this.state.postList.map((val) => {
            return(
                <CardImage 
                    userPhoto={val.userPhoto}
                    username={val.username}
                    imageURL={val.imageURL}
                    caption={val.caption}
                />
            )
        })
        return jsx
    }

    render(){
        if(this.state.postList === []){
            return(
                <Text>
                    halo loading
                </Text>
            )
        }
        console.log(this.state.postList)
        return(
            <View style={{flex: 1}}>
                <Header
                    leftComponent={{ 
                        text: 'Instagrin', 
                        style: {color: 'black', fontSize: 18} 
                    }}
                    leftContainerStyle={{ flex: 3 }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : - 25 
                    }}
                    />
                    <ScrollView>
                        {this.renderPostList()}
                    </ScrollView>
            </View>
        )
    }
}

export default Home