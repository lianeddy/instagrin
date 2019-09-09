import {
    EDIT_PROFILE,
    EDIT_PROFILE_INIT,
    EDIT_PROFILE_FAIL,
    EDIT_PROFILE_SUCCESS,
    USERNAME_PROFILE_CHANGED,
    IMAGE_PROFILE_CHANGED,
    MODAL_SHOW,
    MODAL_CLOSING
} from '../Actions/Types'

const INITIAL_STATE = {
    profileImage: null,
    username: '',
    modalShow: false,
    loading: false,
    error: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case EDIT_PROFILE_INIT : 
            return { ...INITIAL_STATE, ...action.payload}
        case USERNAME_PROFILE_CHANGED : 
            return { ...state, username: action.payload}
        case IMAGE_PROFILE_CHANGED : 
            return { ...state, profileImage: action.payload}
        case EDIT_PROFILE : 
            return { ...state, loading: true, error: '' }
        case EDIT_PROFILE_FAIL : 
            return { ...state, error: action.payload, loading: false}
        case EDIT_PROFILE_SUCCESS : 
            return { ...INITIAL_STATE, loading: false }
        case MODAL_SHOW : 
            return { ...state, modalShow: true}
        case MODAL_SHOW : 
            return { ...state, modalShow: false}
        default :
            return state
    }
}