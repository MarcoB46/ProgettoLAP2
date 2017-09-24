import firebase from '../Common/firebase';
import * as actionTypes from '../Common/actionTypes'

export const checkLogIn = (callback)=>{
    return (dispatch)=>{
        dispatch({type:actionTypes.START_LOADING});
        firebase.auth().onAuthStateChanged(function(user) {
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
                callback('UserProfileInit')//controllare prima se si è già fatto l'init o meno
            } else {
                // No user is signed in.
                dispatch({type: actionTypes.NO_USER}); 
                dispatch({type:actionTypes.STOP_LOADING});
            }
          });
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

