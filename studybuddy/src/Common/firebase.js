import RNFirebase from'react-native-firebase';
//questa configurazione non serve più se si utilizza la v3 di react-native-firebase, in uso la v2
const firebase = RNFirebase.initializeApp({
    persistence:true,
    debug:true
})

export default firebase;
