const functions = require('firebase-functions');

const admin = require('firebase-admin');


admin.initializeApp(functions.config().firebase);

exports.sendNewPostNotification = 
    functions.database.ref(`post/{course}/{subject}/{type}/{postKey}`).onCreate((event) => {

    console.log(event);
        const detailRef = event.data.adminRef.root.child('corsi/'+event.params.course+'/dettaglio/');
        detailRef.once('value')
            .then(snapshot =>{
                if(snapshot.val()){
                    snapshot.val().forEach(function(anno) {
                        anno.materie.forEach(function(materia){
                            if(event.params.subject===materia.codice_materia){

                                if(event.params.type==='g'){
                                    return admin.messaging()
                                    .sendToTopic(event.params.subject, {
                                        notification:{
                                            title:`${event.data.val().author} ha creato un nuovo gruppo in ${materia.nome_materia}`,
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
                                }else if(event.params.type==='q'){
                                        return admin.messaging()
                                    .sendToTopic(event.params.subject, {
                                        notification:{
                                            title:`${event.data.val().author} ha creato un nuovo post in ${materia.nome_materia}` ,
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
                                }else if(event.params.type==='chat'){
                                    console.log('event.data in chat::', event.data.val());
                                    return admin.messaging()
                                    .sendToTopic(event.params.subject, {
                                        notification:{
                                            title:`${event.data.val().user.name} ha commentato nella chat di ${materia.nome_materia}` ,
                                            sound:'default',
                                            color:'#ff0000',
                                            icon:`${event.data.val().avatar}`
                                        }
                                    })
                                    .then((result)=>{
                                        console.log(result)
                                    })
                                    .catch((error)=>{console.log(error)})
                                }
                            }
                        })
                    }, this);
                }
            })
            .catch(error=>{console.log('errore detailRef: ', error)})
        });

exports.groupSubscriptionNotificationHandler=
        functions.database.ref(`post/{course}/{subject}/g/{postKey}/buddyList`).onCreate((event)=>{
            console.log(event);
            const detailRef = event.data.adminRef.root.child('corsi/'+event.params.course+'/dettaglio/');
            detailRef.once('value')
                .then( snapshot=>{
                    if(snapshot.val()){
                        snapshot.val().forEach(function(anno){
                            anno.materie.forEach(function(materia){
                                if(event.params.subject === materia.codice_materia){
                                    console.log("event.val di group subscription:: ",event.val())
                                    return admin.messaging()
                                        .sendToTopic(event.params.postKey, {
                                            notification:{
                                                title:'qualcosa',
                                                sound:'default',
                                                color:'#ff0000'
                                            }
                                        })
                                }
                            })
                        })
                    }
                })
                .catch( error => {console.log(error)})
        });

exports.groupUnsubscriptionNotificationHandler=
        functions.database.ref(`post/{course}/{subject}/g/{postKey}/buddyList`).onDelete((event)=>{
            const detailRef = event.data.adminRef.root.child('corsi/'+event.params.course+'/dettaglio/');
            detailRef.once('value')
                .then( snapshot=>{
                    if(snapshot.val()){
                        snapshot.val().forEach(function(anno){
                            anno.materie.forEach(function(materia){
                                if(event.params.subject === materia.codice_materia){
                                    console.log("event.val di group unsubscription :: ",event.val())
                                    return admin.messaging()
                                        .sendToTopic(event.params.postKey, {
                                            notification:{
                                                title:'qualcosa',
                                                sound:'default',
                                                color:'#ff0000'
                                            }
                                        })
                                }
                            })
                        })
                    }
                })
                .catch( error => {console.log(error)})
        });