import * as actionType from '../Common/actionTypes';

const initialState ={
    corsi:[],
    materie:[],
    questions:[],
    groups:[],
    selectedCourse:null, 
    selectedSubject:null,
    isLoading:false,
    parameters:{},
}

const databaseReducer = (state=initialState, action)=>{
    switch (action.type) {
        case actionType.START_LOADING:
            return Object.assign({}, state, {isLoading:true});
        
        case actionType.STOP_LOADING:
            return Object.assign({}, state, {isLoading:false});

        case actionType.SET_COURSES:
            return Object.assign({}, state, {corsi:action.payload});
        
        case actionType.SET_SUBJECTS:
            return Object.assign({}, state, {materie:action.payload});
        
        case actionType.SET_SELECTED_COURSE:
            return Object.assign({}, state, {selectedCourse: action.payload});
        
        case actionType.SET_SELECTED_SUBJECT:
            return Object.assign({},state, {selectedSubject: action.payload});
        
        case actionType.SET_QUESTIONS:
            return Object.assign({}, state, {questions: action.payload});
    
        case actionType.SET_GROUPS:
            return Object.assign({}, state, {groups: action.payload});
        
        case actionType.SET_PARAMETERS:
            return Object.assign({}, state, {parameters:action.payload});
            
        default:
            return state;
    }
}

export default databaseReducer;