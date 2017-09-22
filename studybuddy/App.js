import React from 'react';
import { StyleSheet, Text, View, TextInput,Button} from 'react-native';
import firebase from './src/firebase';
import {TabNavigator} from 'react-navigation';
import Login from './src/login';
import Chat from './src/chat';



const TabScreen = TabNavigator({
  Login:{screen:Login},
  Chat:{screen:Chat}
},{
  tabBarOptions:{
    style:{backgroundColor:'#004D40'},
    indicatorStyle:{ backgroundColor: '#00BFA5'},
    activeTintColor:'#E3F2FD',
    inactiveTintColor:'#9FA8DA',
    activeBackgroundColor :'#2196f3',
    inactiveBackgroundColor :'#3F51B5',
  }
})




export default class App extends React.Component {
  render() {
    return (
     <TabScreen/>
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
