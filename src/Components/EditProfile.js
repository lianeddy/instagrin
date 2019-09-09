import React, { Component } from 'react';
import { View, Text, Platform, Image, TouchableWithoutFeedback } from 'react-native'
import { Header, ListItem, Button, Input, Overlay } from 'react-native-elements'
import { connect } from 'react-redux'
import { usernameEditProfileChanged, modalShowing, modalClosing, imageEditProfileChanged } from '../Actions'
import ImagePicker from 'react-native-image-crop-picker';

class EditProfile extends Component {

    openGallery = () => {
        ImagePicker.openPicker({
            width: 700,
            height: 700,
            cropping: true,
            mediaType: 'photo'
        }).then(image => {
            this.props.imageEditProfileChanged(img.path)
            this.props.modalClosing()
        }).catch(cancel => {
              console.log(cancel)
        });
    }
    openCamera = () => {
        ImagePicker.openCamera({
            width: 700,
            height: 700,
            cropping: true,
        }).then(image => {
            this.props.imageEditProfileChanged(img.path)
            this.props.modalClosing()
        }).catch(cancel => {
            console.log(cancel)
        });
    }
    onIconSavePress = () => {

    }

    render() { 
        return ( 
            <View>
                <Header
                    placement='left'
                    leftComponent={{
                        icon: 'clear',
                        color: 'black',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    centerComponent={{
                        text: 'Edit Profile',
                        style: {
                            color: 'black',
                            fontSize: 18
                        }
                    }}
                    rightComponent={{
                        icon: 'done',
                        color: '#4388d6',
                        onPress= this.onIconSavePress
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : - 25
                    }}
                />
                <View style={{ alignItems: 'center' }}>
                    <Image 
                        source={{ uri: this.props.profileImage }}
                        style={{ width: 80, height: 80, borderRadius: 80 }} 
                    />
                <TouchableWithoutFeedback onPress={() => this.props.modalShowing()}>
                    <Text style={{ color: '#4388d6', fontSize: 17, paddingTop: 10 }}>
                        Change Profile Photo
                    </Text>
                </TouchableWithoutFeedback>
                </View>
                <View style={{ paddingTop: 15 }}>
                    <Text style={{ paddingTop: 15 }}>
                        Username
                    </Text>
                    <Input 
                        placeholder='Username'
                        value={this.props.username}
                        onChangeText={(text) => this.props.username(text)}
                    />
                </View>
                <View>
                    <Input 
                        placeholder='Username'
                        value={this.props.username}
                        onChangeText={(text) => this.props.usernameEditProfileChanged(text)}
                    />
                </View>
                <Overlay
                    isVisible={this.props.modalShow}
                    height={'auto'}
                    onBackdropPress={() => this.modalClosing()}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '800',
                            paddingBottom: 10,
                            borderBottomColor: '#cfcfcf',
                            borderBottomWidth: 1
                        }}
                    >
                        Change Profile Photo
                    </Text>
                    <TouchableWithoutFeedback
                        onPress={this.openGallery}
                    >
                        <Text
                            style={{
                                fontSize: 16, 
                                paddingVertical: 15
                            }}
                            >
                            Select from Gallery
                        </Text>
                    </TouchableWithoutFeedback>
                     <Button 
                    icon={
                        <Icon 
                        name="photo-library"
                        size={30}
                        color="white"
                        />
                    }
                    title="Select from Gallery"
                    containerStyle={{ marginBottom: 15 }}
                    />
                    <TouchableWithoutFeedback 
                        onPress={this.openCamera}
                    >
                        <Text
                            style={{
                                fontSize: 16, 
                                paddingVertical: 15
                            }}
                            >
                            Open Camera
                        </Text>
                        <Button 
                            icon={
                                <Icon 
                                name="photo-camera"
                                size={30}
                                color="white"
                                /> 
                            }
                            title="Open Camera"
                            />
                        </TouchableWithoutFeedback>
                </Overlay>
            </View>
         );
    }
}

const MapStateToProps = ({ editProfile, auth }) => {
    return{
        profileImage: editProfile.profileImage,
        username: editProfile.username,
        error: editProfile.error,
        loading: editProfile.loading,
        modalShow: editProfile.modalShow,
        userId: auth.user.user.id
    }
}

export default connect(MapStateToProps, { usernameEditProfileChanged, modalShowing, modalClosing, imageEditProfileChanged })(EditProfile);