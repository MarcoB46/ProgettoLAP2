import firebase from '../Common/firebase';
import * as actionTypes from '../Common/actionTypes';
import {subscribe} from './usrActions';

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
    }
}

export const fetchCourseDetails=()=>{
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
    return(dispatch, getState)=>{
        dispatch({type:actionTypes.SET_SELECTED_SUBJECT, payload:subjectId})
        //console.log('setsubscribed ::::',getState().usrReducer.subscribedSubjects.indexOf(subjectId))
        if(getState().usrReducer.subscribedSubjects.indexOf(subjectId)>=0){
            dispatch({type:actionTypes.SET_SUBSCRIBED_BOOL, payload:true});
        }else{
            dispatch({type:actionTypes.SET_SUBSCRIBED_BOOL, payload:false});
        }
    }
}

export const startQuestionsFetch = () =>{
    return (dispatch,getState)=>{
        dispatch({type:actionTypes.START_LOADING});
        var dbState = getState().databaseReducer;
        var ref = firebase.database().ref(`post/${dbState.selectedCourse}/${dbState.selectedSubject}/q`);
        ref.on('value', (snapshot)=>{
            var questions=[];
            if(snapshot.val()){
                snapshot.forEach(
                    (element,index) =>{
                        questions.push(Object.assign({},element.val(),{_key:element.key}))
                        if( element.key === getState().databaseReducer.parameters._key ){
                            dispatch(setDetailParameters(Object.assign({},element.val(),{_key:element.key})))
                        }
                    },this);
            }
            questions = questions.reverse();
            dispatch({type:actionTypes.SET_QUESTIONS, payload:questions});
        });
        dispatch({type:actionTypes.SET_POST_REF, payload:ref});
        dispatch({type:actionTypes.STOP_LOADING});
    }
}

export const sendPost = (toSend)=>{
    return(dispatch, getState) =>{
        var {usrReducer} = getState();
        var {databaseReducer} = getState();
        toSend.author=usrReducer.user.userName;
        toSend.avatar=usrReducer.user.photoURL;
        toSend.images=[];
        var ref = firebase.database().ref(`post/${databaseReducer.selectedCourse}/${databaseReducer.selectedSubject}/${toSend.type}`);
        ref.push(toSend).then((value)=>{
            if(toSend.type==='q'){
                key=value.key
                usrReducer.postPhoto.forEach(
                    (photo, index)=>{
                        firebase.storage().ref(`/files/users/${usrReducer.user.id}/${toSend.type}/images/${key+index}`)
                        .putFile(photo.source)
                            .then( (uploadedFile)=>{
                                toSend.images.push({source:uploadedFile.downloadUrl});
                                    firebase.database().ref(`post/${databaseReducer.selectedCourse}/${databaseReducer.selectedSubject}/${toSend.type}/${key}`).set(toSend)  
                            } )
                            .catch( (error)=>{
                                console.log('errore da updateprofilephoto :: ', error);
                            } );
                    },this);
            }else if(toSend.type==='g'){
                key=value.key;
                dispatch(subscribe('post', key));
            }
        });
    }
}

export const startGroupsFetch=() =>{
    return (dispatch,getState)=>{
        dispatch({type:actionTypes.START_LOADING});
        var dbState = getState().databaseReducer;
        var ref = firebase.database().ref(`post/${dbState.selectedCourse}/${dbState.selectedSubject}/g`);
        ref.on('value', (snapshot)=>{
            var groups=[];
            if(snapshot.val()){
                snapshot.forEach(
                    (element,index) =>{
                        groups.push(Object.assign({},element.val(),{_key:element.key}))
                        if( element.key === getState().databaseReducer.parameters._key ){
                            dispatch(setDetailParameters(Object.assign({},element.val(),{_key:element.key})))
                        }
                    },this);
            }
            groups = groups.reverse();
            dispatch({type:actionTypes.SET_GROUPS, payload:groups});
        });
        dispatch({type:actionTypes.SET_GROUPS_REF, payload:ref});
        dispatch({type:actionTypes.STOP_LOADING});
    }
}

export const stopGroupsFetch=()=>{
    return (dispatch, getState)=>{
        if(getState().databaseReducer.grogroups_ref)
        getState().databaseReducer.grogroups_ref.off('value',(val)=>{
            dispatch({type:actionTypes.SET_GROUPS_REF,payload:null});
        })
    }
}

export const stopPostFetch=()=>{
    return (dispatch, getState)=>{
        if(getState().databaseReducer.post_ref)
        getState().databaseReducer.post_ref.off('value',(val)=>{
            dispatch({type:actionTypes.SET_POST_REF,payload:null});
        })
    }
}

export const stopChatFetch=()=>{
    return (dispatch, getState)=>{
        if(getState().databaseReducer.chat_ref)
        getState().databaseReducer.chat_ref.off('value',(val)=>{
            dispatch({type:actionTypes.SET_CHAT_REF,payload:null});
        })
    }
}

export const setDetailParameters=(params)=>{
    return (dispatch)=>{
        dispatch({type:actionTypes.START_LOADING});
        dispatch({type:actionTypes.SET_PARAMETERS, payload:params});
        dispatch({type:actionTypes.STOP_LOADING});
    }
}

export const joinGroup = ()=>{
    return(dispatch, getState) => {
        var uid = getState().usrReducer.user.id;
        var postKey = getState().databaseReducer.parameters._key;
        var dbState = getState().databaseReducer;
        var toSend={
            uid: uid,
            avatar: getState().usrReducer.user.photoURL,
            userName:getState().usrReducer.user.userName
        }
        firebase.database().ref(`post/${dbState.selectedCourse}/${dbState.selectedSubject}/g/${postKey}`).set({
            ...dbState.parameters,
            buddyList: (getState().databaseReducer.parameters.buddyList? [...getState().databaseReducer.parameters.buddyList, toSend] : [toSend]  ) 
        })
    }
}

export const leaveGroup=()=>{
    return(dispatch, getState)=>{
        var uid= getState().usrReducer.user.id;
        var postKey = getState().databaseReducer.parameters._key;
        var dbState = getState().databaseReducer;
        var{buddyList} = dbState.parameters;
        firebase.database().ref(`post/${dbState.selectedCourse}/${dbState.selectedSubject}/g/${postKey}`).set({
            ...dbState.parameters,
            buddyList:[ ...buddyList.slice(0, buddyList.findIndex(element => element.uid===uid)), ...buddyList.slice(buddyList.findIndex(element => element.uid === uid)+1) ] 
        });
    }
}

export const startChatFetch=()=>{
    return(dispatch, getState) =>{
        dispatch({type:actionTypes.START_LOADING});
        var ref = firebase.database().ref(`post/${getState().databaseReducer.selectedCourse}/${getState().databaseReducer.selectedSubject}/chat`);
        ref.on('value', (snapshot)=>{
            var messaggi=[];
            if(snapshot.val()){
                snapshot.forEach(
                    (element,index)=>{
                        messaggi.push(element.val())
                    }, this )
                dispatch({type:actionTypes.SET_MESSAGES, payload: messaggi});
            }
        });
        dispatch({type:actionTypes.SET_CHAT_REF, payload:ref});
        dispatch({type:actionTypes.STOP_LOADING});
    }
}

export const sendMessage=(messages)=>{
    return(dispatch,getState)=>{
        var {databaseReducer} = getState();
        firebase.database().ref(`post/${databaseReducer.selectedCourse}/${databaseReducer.selectedSubject}/chat/`).set(messages)
    }
}