import * as actionType from '../Common/actionTypes';
import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
    user:{
        userName:'',
        mail:'',
        photoURL:'',
        id:'',
    },
    isLoading: false,
    authListener:null,
    EOI: false,
    postPhoto:[],
}


const usrReducer = (state=initialState, action)=>{
    switch (action.type) {
        case actionType.START_LOADING:
            return Object.assign({},state, {isLoading:true});
        
        case actionType.STOP_LOADING:
            return Object.assign({}, state, {isLoading:false});
        
        case actionType.USER_LOGGED:
            return Object.assign({}, state, {user:action.payload});
        
        case actionType.NO_USER:
            return Object.assign({}, state, { user:{  } , authListener:null });
        
        case actionType.UPDATE_PROFILE:
            return Object.assign({}, state, {user:{...state.user,...action.param}});
        
        case actionType.SET_USER_AUTH_LISTENER:
            return Object.assign({}, state, {authListener:action.payload});

        case actionType.SET_EOI:
            return Object.assign({}, state, {EOI: action.payload});

        case actionType.REMOVE_POST_PHOTO:
            return Object.assign({}, state, {postPhoto:[...state.postPhoto.slice(0,action.payload),...state.postPhoto.slice(action.payload+1)]});

        case actionType.REMOVE_POST_PHOTOS:
            return Object.assign({}, state, {postPhoto:[]});

        case actionType.ADD_POST_PHOTO:
            return Object.assign({}, state, {postPhoto:[...state.postPhoto, {source:action.payload}]});

        case REHYDRATE:
            var incoming = action.payload.myReducer
            if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
            return state
        
        default:
            return state;
    }
}

export default usrReducer;