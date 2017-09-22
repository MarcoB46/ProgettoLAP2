const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
const _ = require('lodash');

admin.initializeApp(functions.config().firebase);

exports.sendNewMessageNotification = 
    functions.database.ref(`users/messages/{mid}`).onWrite((event) => {
     

        

    console.log(event.data.val());

       return admin.messaging()
        .sendToTopic('main', {
            notification:{
                title:`${event.data.val().author} ha commentato in main`,
                body:`${ event.data.val().text }`,
                sound:'default',
                color:'#ff0000'
            }
        })
        .then((result)=>{
            console.log(result)
        })
        .catch((error)=>{console.log(error)})
    

    // const getValuePromise = admin.database()
    //                             // .ref('messages')
    //                             .orderByKey()
    //                             .limitToLast(1)
    //                             .once('value');

    //console.log(event.data.val());
    
    // return getValuePromise
    //     .then((snapshot)=>{
    //         console.log(_.values(snapshot.val())[0]);
    //         const { text, author} = _.values(snapshot.val())[0];

    //         const payload = {
    //             notification:{
    //                 title:`${ author } ha commentato in main`,
    //                 body: `${ text }`,
    //                 sound:'default',
    //                 color: '#2196F3'
    //             }
    //         };
    //         return admin.messaging()
    //                 .sendToTopic('main', payload);
    //     });
    });





 


        // const getValuePromise = admin.database()
    //                              .ref('messages')
    //                              .orderByKey()
    //                              .limitToLast(1)
    //                              .once('value');

    // return getValuePromise.then(snapshot => {
    //     console.log(_.values(snapshot.val())[0]);
    //     const { text, author } = _.values(snapshot.val())[0];

    //     const payload = {
    //         notification: {
    //             title: 'New msg',
    //             body: text,
    //             //icon: author.avatar
    //         }
    //     };

    //     return admin.messaging()
    //                 .sendToTopic('main', payload);

// //prova mia
//     console.log(event.data.val());
    
//     getValuePromise = admin.database()
//         .ref('messages')
//         .limitToLast(1)
//         .once('value');

//     getValuePromise
//         .then((snapshot)=>{
//             console.log(...event.data.val()[0]);
//             const payload={
//                 notification:{
//                     title:`nuovo post da ${event.data.val()[0].author}`,
//                     body:event.data.val()[0].text
//                 }
//             }
//         })

//         return admin.messaging()
//             .sendToTopic('main', payload)
//             .then((result)=>{
//                 console.log(result)
//             })
//             .catch((error)=>{
//                 console.log(error)
//             })
// //fine prova mia !!!!


    // const notification = event.data.val();
    // const payload={
    //     notification:{
    //         body:formatBody(notification)
    //     }
    // };

    // return admin.messaging()
    //     .sendToTopic('main', payload)
    //     .then((result)=>{
    //         console.log(result);
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })