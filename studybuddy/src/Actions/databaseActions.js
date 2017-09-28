import firebase from '../Common/firebase';
import * as actionTypes from '../Common/actionTypes';

export const getCourses= ()=>{
    return (dispatch)=>{
        var ref=firebase.database().ref('corsi');
        
        ref.once('value',(snapshot)=>{
            var corsi= new Array();
            snapshot.forEach((child)=>{
                console.log('child::::' , child)
                corsi.push({
                    corso:child._value.nome_corso,
                    materie:child._value.materie,
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
        //dispatch(fetchPost(CID));
    }
}

export const fetchPost=(path)=>{ //da modificare
    firebase.database().ref(path)
        .on('value',(snapshot)=>{
            snapshot.forEach((child)=>{
                
            })
        })
}