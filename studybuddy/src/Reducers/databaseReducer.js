import * as actionType from '../Common/actionTypes';

const initialState ={
    corsi:[],
    selectedCourse:null, 
    isLoading:false
}

const databaseReducer = (state=initialState, action)=>{
    switch (action.type) {
        case actionType.SET_COURSES:
            return Object.assign({}, state, {corsi:action.payload});
    
        default:
            return state;
    }
}

export default databaseReducer;