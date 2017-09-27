import firebase from '../Common/firebase';
import * as actionTypes from '../Common/actionTypes';
var ImagePicker = require('react-native-image-picker');

export const checkLogIn = (callback)=>{
    return (dispatch, getState)=>{
        if(!getState().usrReducer.authListener){
            dispatch({type:actionTypes.START_LOADING});
            const stopAuthListener = firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    var userInfo = { // modificare questa parte se utilizzero redux persist
                        mail: user.email,
                        userName: user.displayName,
                        id:user.uid,
                        photoURL:user.photoURL
                    }
                    console.log('====================================');
                    console.log('utente loggato :: ', userInfo);
                    console.log('====================================');
    
                    dispatch({type:actionTypes.STOP_LOADING});
                    dispatch({ type:actionTypes.USER_LOGGED, payload:userInfo })
                    callback('UserProfileInit')//controllare prima se si è già fatto l'init o meno , o , impostare una variabile nello store che indica il targhet in cui deve essere portata l'app, nell'init o nella home
                } else {
                    // No user is signed in.
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
            // .then((user)=>{
    
            // })
            .catch((error)=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Password Errata.');
                } else if (errorCode === 'auth/user-disabled') {
                    alert('Account Sospeso. '); //inutile
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

        var options = {
            title:'Seleziona il tuo avatar',
            takePhotoButtonTitle:'Scatta una foto',
            chooseFromLibraryButtonTitle:'Seleziona dalla galleria',
            quality:1,
            rotation:0,
            noData:true,
            storageOptions: {
                cameraRoll:true
              }
        }

        ImagePicker.showImagePicker(options, (response)=>{
            if(response.didCancel){
                //utente ha cancellato la selezione, non fare niente
                console.log('selezione cancellata');
            }else if(response.error){
                console.log('errore da updateprofileavatar:: ', error);
                alert('errore da imagePicker');
            }else{
                let source = {uri: response.uri};
                if(param.target==='userPhoto'){
                    dispatch(updateProfilePhoto({source:source.uri , uid:usrReducer.user.id}));
                }
            }
        })

    }
}
