import * as actionType from '../Common/actionTypes';

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

        default:
            return state;
    }
}

export default usrReducer;