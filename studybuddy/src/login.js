import React from 'react';
import { StyleSheet, Text, View, TextInput,Button} from 'react-native';
import firebase from './firebase';

export default class Login extends React.Component {
    
      constructor(props){
        super(props);
        this.state={
          mail:'aaa@gmail.com',
          psw:'aaaaaa',
          message:''
        };
        this.onPressHandlerLogin=this.onPressHandlerLogin.bind(this);
        this.onPressHandlerLogout=this.onPressHandlerLogout.bind(this);
       this.onPressHandlerSubscribe= this.onPressHandlerSubscribe.bind(this);
       this.onPressHandlerUnsubscribe= this.onPressHandlerUnsubscribe.bind(this);
        this.onPressHandlerSend=this.onPressHandlerSend.bind(this);
      }
    
    
    
    
      componentWillMount = () => {
        firebase.messaging().onMessage((message)=>{
          console.log('notifica ricevuta :: ', message);
          alert(JSON.stringify(message));
          firebase.messaging().createLocalNotification(message);
        })
    
        firebase.messaging().getInitialNotification()
          .then((notification)=>{
            console.log('notifica che ha aperto la app :: ',notification);
          })
    
      }
      
    
      render() {
        return (
          <View style={styles.container}>
            <TextInput
            style={{width:'90%'}}
              placeholder='aaa@gmail.com'
              value = {this.state.mail}
              onChangeText={(text)=>{
                this.setState({
                  mail:text
                })
              }}
              defaultValue={'aaa@gmail.com'}
            ></TextInput>
            <TextInput
            style={{width:'90%'}}
              placeholder='aaaaaa'
              onChangeText={(text)=>{
                this.setState({
                  psw:text
                })
              }}
              value = {this.state.psw}
              defaultValue={'aaaaaa'}
            ></TextInput>
    
            <Button
              title='login'
              onPress={()=>this.onPressHandlerLogin()}
            ></Button>
            <Button
              title='logout'
              onPress={()=>this.onPressHandlerLogout()}
            ></Button>
            <Button
              title='subscribe'
              onPress={()=>this.onPressHandlerSubscribe()}
            ></Button>
            <Button
              title='unsubscribe'
              onPress={()=>this.onPressHandlerUnsubscribe()}
            ></Button>
            <Button
              title='getToken'
              onPress={()=>this.onPressHandlerGetToken()}
            ></Button>
          </View>
        );
      }
    
      onPressHandlerLogin=()=>{
        //qualcosa , per ora faccio senza login 
        console.log('premuto');
        firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.psw)
          .then((user)=>{
            console.log('successfully logged in ::' , user);
          })
          .catch((error)=>{
            console.log('errore login :: ', error);
          })
      }
    
      onPressHandlerLogout=()=>{
        firebase.auth().signOut()
          .then(()=>{
            console.log('signOut successfull');
          })
          .catch((error)=>{
            console.log('errore logout :: ', error);
          })
      }
    
      onPressHandlerSubscribe = () =>{
        firebase.messaging().subscribeToTopic('main');
      }
    
      onPressHandlerUnsubscribe = ()=>{
        firebase.messaging().unsubscribeFromTopic('main');
      }
    
      onPressHandlerGetToken= ()=>{
        firebase.messaging().getToken()
          .then((token)=>{
            console.log('token :: ', token);
          })
    
      }
    
      onPressHandlerSend=()=>{
        firebase.database()
          .ref('/users/messages')
          .push({author:firebase.auth().currentUser.email, text:this.state.message}, ()=>{
            this.setState({message:''})
          })
      }
    }
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });