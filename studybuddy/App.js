import React from 'react';
import {Provider} from 'react-redux';
import {TabNavigator, StackNavigator} from 'react-navigation';
import store from './src/Store/store';
import SignIn from './src/Containers/signInContainer';
import LogIn from './src/Containers/loginContainer';
import UserProfileInit from './src/Containers/userProfileInitContainer';
import QuestionPage from './src/Containers/questionPageContainer';
import GroupPage from './src/Containers/groupsPageContainer';
import CourseDetails from './src/Containers/courseDetailsContainer';
import {Spinner} from './src/Common/spinner';
import {persistStore} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import HeaderButtons from './src/Common/headerButtons';
import NewQuestion from './src/Containers/newQuestionContainer';
import ElementDetail from './src/Containers/elementDetailContainer';
import NewGroup from './src/Containers/newGroupContainer';


const MainTabScreen = TabNavigator({
  Question: {screen:QuestionPage, 
    navigationOptions:{tabBarLabel:'Domande'}},
  Group:{screen:GroupPage,
    navigationOptions:{tabBarLabel:'Gruppi'}}
}, {
  tabBarPosition:'bottom',
  tabBarOptions:{
    style:{backgroundColor:'#3F51B5'},
  }
})

const MiddleStackScreen=StackNavigator({
  CourseDetail:{
    screen:CourseDetails,
    navigationOptions:({navigation})=>({
      header:null
    })
  },
  MainTabScreen:{
    screen: MainTabScreen,
    navigationOptions:({navigation})=>({
      headerTintColor:'white',
      headerStyle:{backgroundColor:'#3F51B5'},
      headerRight:(
        <HeaderButtons/>
      ),
      title: (navigation.state.params.nome_materia ? navigation.state.params.nome_materia : '' ) 
    })
  },
  NewQuestion:{
    screen:NewQuestion, 
    navigationOptions:({navigation})=>({
      headerTintColor:'white',
      headerStyle:{backgroundColor:'#3F51B5'},
      title:'Nuova Domanda:'
    })
  },
  
  ElementDetail:{
    screen: ElementDetail, 
    navigationOptions:({navigation})=>({
      headerTintColor:'white',
      headerStyle:{backgroundColor:'#3F51B5'}
    })
  },
  NewGroup:{
    screen:NewGroup,
    navigationOptions:({navigation})=>({
      headerTintColor:'white',
      headerStyle:{backgroundColor:'#3F51B5'}
    })
  }
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
  MiddleStackScreen:{
    screen:MiddleStackScreen,
    navigationOptions:({navigation})=>({
      header:null,
      headerLeft: null,
    })
  }
})

export default class App extends React.Component{
  constructor(){
    super();
    this.state={rehydrated:false}
  }
  componentWillMount = () => {
    persistStore(store,{storage:AsyncStorage},()=>{
      this.setState({
        rehydrated:true
      })
    });
  }
  
  render(){
    if(!this.state.rehydrated){
      return <Spinner/>
    }
    return (
      <Provider store={store}>
          <MainStack/>
        </Provider>
    )
  }
}
