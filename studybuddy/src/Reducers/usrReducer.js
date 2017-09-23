import * as actionType from '../Common/actionTypes';

const initialState = {
    user:{
        username:'',
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
        
    
        default:
            return state;
    }
}

export default usrReducer;