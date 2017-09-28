import React from 'react';
import {Provider} from 'react-redux';
import {TabNavigator, StackNavigator} from 'react-navigation';
import store from './src/Store/store';
import SignIn from './src/Containers/signInContainer';
import LogIn from './src/Containers/loginContainer';
import UserProfileInit from './src/Containers/userProfileInitContainer';
import QuestionPage from './src/Containers/questionPageContainer';
import GroupPage from './src/Containers/groupPageContainer';



const MainTabScreen = TabNavigator({
  Question: {screen:QuestionPage},
  Group:{screen:GroupPage}
})

const MainStack = StackNavigator({
  LogIn:{
    screen: LogIn,
    navigationOptions: ({navigation})=>({
      title:'Accedi:', 
      header:null  
    }),
  },
  SignIn:{
    screen: SignIn,
    navigationOptions: ({navigation})=>({
      title:'Registrati !', 
      header:null  
    })
  },
  UserProfileInit:{
    screen: UserProfileInit,
    navigationOptions:({navigation})=>({
      header:null,
      headerLeft: null,
    })
  },
  MainTabScreen:{
    screen: MainTabScreen,
    navigationOptions:({navigate})=>({
      header:null,
    })
  }
})

export default class App extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <MainStack/>
      </Provider>
    )
  }
}
