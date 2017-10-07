import React from 'react';
import {Provider} from 'react-redux';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';
import store from './src/Store/store';
import SignIn from './src/Containers/signInContainer';
import LogIn from './src/Containers/loginContainer';
import UserProfileInit from './src/Containers/userProfileInitContainer';
import QuestionPage from './src/Containers/questionPageContainer';
import GroupPage from './src/Containers/groupsPageContainer';
import CourseDetails from './src/Containers/courseDetailsContainer';
import {Spinner} from './src/Common/spinner';
import {persistStore} from 'redux-persist';
import {AsyncStorage, View, Text} from 'react-native';
import HeaderButtons from './src/Common/headerButtons';
import NewQuestion from './src/Containers/newQuestionContainer';
import ElementDetail from './src/Containers/elementDetailContainer';
import NewGroup from './src/Containers/newGroupContainer';
import { Icon } from 'react-native-elements';
import UpdateProfile from './src/Containers/updateProfileContainer';
import Chat from './src/Containers/chatContainer';
import UserDetailView from './src/Common/userDetailView';


const MainTabScreen = TabNavigator({
  Question: {screen:QuestionPage, 
    navigationOptions:{tabBarLabel:'Avvisi'}},
  Group:{screen:GroupPage,
    navigationOptions:{tabBarLabel:'Gruppi'}},
  Chat:{screen:Chat,
    navigationOptions:{tabBarLabel:'Chat'}}
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
      title:'Nuovo Avviso :'
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

//forse sostituire al posto di middlestackscreen in mainstack
const DrawerNav=DrawerNavigator({
  Home:{
    screen:MiddleStackScreen, 
    navigationOptions:{
      drawerLabel:'Corso',
      drawerIcon: ({ tintColor }) => (
        <Icon name='university' type='font-awesome' />
      )
    }
  },
  ProfileSettings:{
    screen: UpdateProfile,
    navigationOptions:{
      drawerLabel:'Modifica Profilo e Preferenze',
      drawerIcon:({tintcolo})=>(
        <Icon name='user-circle' type='font-awesome' />        
      )
    },
  }
}, {
  contentComponent:  (props) =>
    <UserDetailView params={props} />
  
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
    screen:DrawerNav,  //old MiddleStackScreen
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
