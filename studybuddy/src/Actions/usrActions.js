import firebase from '../Common/firebase';
import * as actionTypes from '../Common/actionTypes';
var ImagePicker = require('react-native-image-picker');

export const checkLogIn = (callback,target='MiddleStackScreen')=>{
    return (dispatch, getState)=>{
        if(!getState().usrReducer.authListener){
            dispatch({type:actionTypes.START_LOADING});
            const stopAuthListener = firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    var userInfo = { 
                        mail: user.email,
                        userName: user.displayName,
                        id:user.uid,
                        photoURL:user.photoURL
                    }
                    dispatch({type:actionTypes.STOP_LOADING});
                    dispatch({ type:actionTypes.USER_LOGGED, payload:userInfo })
                    if(getState().usrReducer.EOI) callback(target)
                    else callback('UserProfileInit');
                } else {
                    dispatch({type: actionTypes.NO_USER}); 
                    dispatch({type:actionTypes.STOP_LOADING});
                }
              });
              dispatch({type:actionTypes.SET_USER_AUTH_LISTENER, payload: stopAuthListener});
        }
    }
} 

export const signIn = (user, callback)=>{
    return (dispatch) => {
        dispatch({type:actionTypes.START_LOADING});
        firebase.auth().createUserWithEmailAndPassword(user.mail, user.password)
        .then(()=>{
            callback('UserProfileInit');
        }) 
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode,' ++ ', errorMessage);
            if(errorCode === 'auth/weak-password'){
                alert('La Password deve essere di almeno 6 caratteri.')
            }else if(errorCode === 'auth/email-already-in-use'){
                alert('Mail già in uso.');
            }else if(errorCode === 'auth/invalid-email'){
                alert('Formato Mail invalido.');
            }
            dispatch({type:actionTypes.STOP_LOADING});
          });
    }
}

export const attemptLogIn = (user, callback)=>{
    return (dispatch) =>{
        dispatch({type:actionTypes.START_LOADING});
        firebase.auth().signInWithEmailAndPassword(user.mail, user.password)
            .catch((error)=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Password Errata.');
                } else if (errorCode === 'auth/user-disabled') {
                    alert('Account Sospeso. ');
                }else if (errorCode === 'auth/user-not-found') {
                    alert('Utente non trovato.');
                } else if (errorCode === 'auth/invalid-email') {
                    alert('Email Invalida. ');
                }  
                dispatch({type:actionTypes.NO_USER});
            })
    }
}

const updateProfilePhoto = (param) =>{
    return(dispatch)=>{
        firebase.storage()
        .ref(`/files/users/${param.uid}/profileImage`)
        .putFile(param.source)
            .then( (uploadedFile)=>{
                firebase.auth().currentUser
                .updateProfile({
                    photoURL:uploadedFile.downloadUrl
                }).then(()=>{
                    dispatch({type:actionTypes.UPDATE_PROFILE, param:{photoURL:uploadedFile.downloadUrl}})
                })
            } )
            .catch( (error)=>{
                console.log('errore da updateprofilephoto :: ', error);
            } );
    }
}

export const takePhoto =(param)=>{
    return (dispatch, getState)=>{
        const {usrReducer} = getState();
        var options;
        if(param.target==='userPhoto'){
            options = {
                title:'Seleziona il tuo avatar',
                takePhotoButtonTitle:'Scatta una foto',
                chooseFromLibraryButtonTitle:'Seleziona dalla galleria',
                quality:0.5,
                rotation:0,
                noData:true,
                storageOptions: {
                    cameraRoll:true
                  }
            }
        }else if(param.target==='postPhoto'){
            options = {
                title:'Scegli una immagine',
                takePhotoButtonTitle:'Scatta una foto',
                chooseFromLibraryButtonTitle:'Seleziona dalla galleria',
                quality:0.5,
                rotation:0,
                noData:true,
                storageOptions: {
                    cameraRoll:true
                  }
            }
        }
         
        ImagePicker.showImagePicker(options, (response)=>{
            if(response.didCancel){
                console.log('selezione cancellata');
            }else if(response.error){
                console.log('errore da updateprofileavatar:: ', error);
                alert('errore da imagePicker');
            }else{
                let source = {uri: response.uri};
                if(param.target==='userPhoto'){
                    dispatch(updateProfilePhoto({source:source.uri , uid:usrReducer.user.id}));
                }else if(param.target==='postPhoto'){
                    dispatch({type:actionTypes.ADD_POST_PHOTO, payload: source.uri});
                }
            }
        })
    }
}

export const setUserName =(userName)=>{
    return (dispatch)=>{
        firebase.auth().currentUser
            .updateProfile({
                displayName:userName
            })
            .then(()=>{
                dispatch({type:actionTypes.UPDATE_PROFILE, param:{userName:userName}})
            })
    }
}

export const setEOI = (bool) =>{
    return{type:actionTypes.SET_EOI, payload:bool}
}


export const removePhoto= (param) =>{
    return(dispatch)=>{
        if(param.target === 'postPhoto'){
            dispatch({type:actionTypes.REMOVE_POST_PHOTO, payload: param.index})
        }
        if(param.target === 'postPhotosAll'){
            dispatch({type:actionTypes.REMOVE_POST_PHOTOS});
        }
    }
}

export const subscribe =(target, param=null) =>{
    return ( dispatch, getState) =>{
        if(target==='post'){
            firebase.messaging().subscribeToTopic( param ) 
            dispatch({type:actionTypes.SUBSCRIBE_POST, payload: param});           
        }else if(target==='subject'){
            firebase.messaging().subscribeToTopic(getState().databaseReducer.selectedSubject)
            dispatch({type:actionTypes.SUBSCRIBE_SUBJECT, payload: getState().databaseReducer.selectedSubject});
            dispatch({type:actionTypes.SET_SUBSCRIBED_BOOL, payload:true});
        }
    }
}
export const unsubscribe =(target, param=null) =>{
    return ( dispatch, getState) =>{
        if(target==='post'){ 
            firebase.messaging().unsubscribeFromTopic( param ) 
            dispatch({type:actionTypes.UNSUBSCRIBE_POST, payload: param});           
        }else if(target==='subject'){
            firebase.messaging().unsubscribeFromTopic(getState().databaseReducer.selectedSubject)
            dispatch({type:actionTypes.UNSUBSCRIBE_SUBJECT, payload: getState().databaseReducer.selectedSubject});
            dispatch({type:actionTypes.SET_SUBSCRIBED_BOOL, payload:false});
        }
    }
}

export const logOut = (callback, target) =>{
    return(dispatch)=>{
        dispatch({type:'VOID'});
        firebase.auth().signOut()
        .then(() => {
          console.log('logOut riuscito');
          callback(target);
        })
        .catch(error => {
            console.log('errore logOut :: ', error);
        });
    }
}