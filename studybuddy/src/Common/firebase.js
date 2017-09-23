import RNFirebase from'react-native-firebase';

const firebase = RNFirebase.initializeApp({
    persistence:true,
    debug:true
})

export default firebase;
