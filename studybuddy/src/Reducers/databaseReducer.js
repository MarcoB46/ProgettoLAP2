import * as actionType from '../Common/actionTypes';

const initialState ={
    corsi:[],
    materie:[],
    questions:[],
    groups:[],
    messaggi:[],
    selectedCourse:null, 
    selectedSubject:null,
    isLoading:false,
    parameters:{},
    chat_ref:null,
    post_ref:null,
    groups_ref:null
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

        case actionType.SET_POST_REF:
            return Object.assign({}, state, {post_ref:action.payload});

        case actionType.SET_GROUPS_REF:
            return Object.assign({}, state, {groups_ref:action.payload});
    
        case actionType.SET_CHAT_REF:
            return Object.assign({}, state, {chat_ref: action.payload});

        case actionType.SET_MESSAGES:
            return Object.assign({}, state, {messaggi:action.payload});
            
        default:
            return state;
    }
}

export default databaseReducer;