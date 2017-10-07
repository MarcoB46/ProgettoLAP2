import * as actionType from '../Common/actionTypes';
import {REHYDRATE} from 'redux-persist/constants';
import {DEFAULT_AVATAR} from '../Common/const'
const initialState = {
    user:{
        userName:'',
        mail:'',
        photoURL:DEFAULT_AVATAR,
        id:'',
    },
    isLoading: false,
    authListener:null,
    EOI: false,
    postPhoto:[],
    subscribedPosts:[],
    subscribedSubjects:[],
    subscribed:false
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
            return Object.assign({}, initialState );
        
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

        case actionType.SUBSCRIBE_COURSE:
            return Object.assign({}, state, {subscribedCourses:[...state.subscribedCourses , action.payload ]});

        case actionType.SUBSCRIBE_SUBJECT:
            return Object.assign({}, state, {subscribedSubjects:[...state.subscribedSubjects , action.payload ]});
        
        case actionType.UNSUBSCRIBE_COURSE:
            return Object.assign({}, state, {subscribedCourses:[...state.subscribedCourses.slice(0,state.subscribedCourses.indexOf(action.payload),...state.subscribedCourses.slice(state.subscribedCourses.indexOf(action.payload)+1))]}) 
            
        case actionType.UNSUBSCRIBE_SUBJECT:
            return Object.assign({}, state, {subscribedSubjects:[...state.subscribedSubjects.slice(0,state.subscribedSubjects.indexOf(action.payload),...state.subscribedSubjects.slice(state.subscribedSubjects.indexOf(action.payload)+1))]}) 

        case actionType.SET_SUBSCRIBED_BOOL:
            return Object.assign({}, state, {subscribed:action.payload});

        case REHYDRATE:
            var incoming = action.payload.myReducer
            if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
            return state
        
        default:
            return state;
    }
}

export default usrReducer;