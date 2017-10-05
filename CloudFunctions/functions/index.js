const functions = require('firebase-functions');

const admin = require('firebase-admin');


admin.initializeApp(functions.config().firebase);

exports.sendNewMessageNotification = 
    functions.database.ref(`post/{course}/{subject}/{type}/{groupKey}`).onCreate((event) => {

    console.log(event);

       return admin.messaging()
        .sendToTopic(event.params.subject, {
            notification:{
                title:(event.params.type==='g'? `${event.data.val().author} ha creato un nuovo gruppo`: `${event.data.val().author} ha creato un nuovo post` ),
                body:`${ event.data.val().text }`,
                sound:'default',
                color:'#ff0000',
                icon:`${event.data.val().avatar}`
            }
        })
        .then((result)=>{
            console.log(result)
        })
        .catch((error)=>{console.log(error)})
    });



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