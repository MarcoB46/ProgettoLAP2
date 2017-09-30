import firebase from '../Common/firebase';
import * as actionTypes from '../Common/actionTypes';

export const getCourses= ()=>{
    return (dispatch)=>{
        var ref=firebase.database().ref('corsi');
        
        ref.once('value',(snapshot)=>{
            var corsi= new Array();
            snapshot.forEach((child)=>{
                corsi.push({
                    corso:child._value.nome_corso,
                    key:child.key
                })
            })
            dispatch({type:actionTypes.SET_COURSES, payload:corsi});
        });
        ref.keepSynced(true)
    }
}

export const setCourseId=(CID)=>{
    return (dispatch)=>{
        dispatch({type:actionTypes.SET_SELECTED_COURSE, payload:CID});
        //dispatch(fetchCourseDetails(CID));
    }
}

export const fetchCourseDetails=()=>{ //da modificare
    return (dispatch, getState) =>{
        dispatch({type:actionTypes.START_LOADING});
        var ref = firebase.database().ref(`corsi/${getState().databaseReducer.selectedCourse}`);
        ref.once('value',(snapshot)=>{
            var arr = snapshot._value.dettaglio;
            dispatch({type:actionTypes.SET_SUBJECTS, payload:arr});
            dispatch({type:actionTypes.STOP_LOADING});
        })
        ref.keepSynced(true);
    }
}

export const setSubject=(subjectId)=>{
    return {type:actionTypes.SET_SELECTED_SUBJECT, payload:subjectId};
}

export const startQuestionFetch = () =>{
    return (dispatch,getState)=>{
        dispatch({type:actionTypes.START_LOADING});
        var dbState = getState().databaseReducer;
        var ref = firebase.database().ref(`${dbState.selectedCourse}/${dbState.selectedSubject}/q`);
        ref.on('value', (snapshot)=>{
            var questions=[];
            if(snapshot.val()){
                snapshot.val().forEach(
                    (element,index) =>{
                        questions.push(Object.assign({},element,{key:index}))
                    },this);
            }
            dispatch({type:actionTypes.SET_QUESTIONS, payload:questions});
        });
        dispatch({type:actionTypes.STOP_LOADING});
    }
}