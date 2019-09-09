import {
    EDIT_PROFILE_INIT,
    USERNAME_PROFILE_CHANGED,
    MODAL_SHOW,
    MODAL_CLOSE,
    IMAGE_PROFILE_CHANGED
} from './Types'

import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import '@firebase/storage'

export const editProfileInit = (username, profileImage) => {
    return{
        type: EDIT_PROFILE_INIT,
        payload: {
            username,
            profileImage
        }
    }
}
export const usernameEditProfileChanged = (text) => {
    return{
        type: USERNAME_PROFILE_CHANGED,
        payload: text
    }
}

export const imageEditProfileChanged = (imgPath) => {
    return{
        type: IMAGE_PROFILE_CHANGED,
        payload: imgPath
    }
}

export const modalShowing = () => {
    return{
        type: MODAL_SHOW
    }
}

export const modalClosing = () => {
    return {
        type: MODAL_CLOSE
    }
}

export const saveUpdateProfile = (username, profileImage, uid) => {
    return(dispatch) => {

    }
}