import * as actionType from '../Common/actionTypes';

const initialState = {
    user:{
        userName:'',
        mail:'',
        photoURL:'',
        id:'',
    },
    isLoading: false,

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
            return Object.assign({}, state, {user:{  }});
        
        case actionType.UPDATE_PROFILE:
            return Object.assign({}, state, {user:{photoURL:action.param.photoURL}});
    
        default:
            return state;
    }
}

export default usrReducer;