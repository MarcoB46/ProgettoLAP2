import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { FormLabel, FormInput , Button, Icon, Text, Card,SocialIcon} from 'react-native-elements';

export default class componentName extends Component {
  constructor(props){
    super(props);
    this.state={
      mail:'',
      password:''
    }
    this.resetNavigation=this.resetNavigation.bind(this);
  }
  componentWillMount = () => {
    this.props.checkLogIn(this.resetNavigation)
  }
  resetNavigation= (targetRoute) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View  style={{justifyContent:'center', flex:1, justifyContent: 'space-around', backgroundColor:'#1A237E'}}>

        <Card>
          <View style={{flexDirection:'row' }}>
            <Icon
              containerStyle={{alignSelf:'flex-end'}}
              name='envelope'
              type='font-awesome'
              color='#2196F3'
              onPress={() => alert('inserisci la tua mail !')}
              underlayColor='#3F51B5ff'
              reverse
              />
              <View>
                <FormLabel>Mail</FormLabel>
                <FormInput 
                  onChangeText={(text)=>{
                    this.setState({
                      mail:text
                    })
                  
                  }}
                  inputStyle={{color:'#03A9F4'}}
                  keyboardType='email-address'
                />
              </View>
          </View>
          <View style={{flexDirection:'row'}}>
            <Icon
              containerStyle={{alignSelf:'flex-end'}}
              name='unlock-alt'
              type='font-awesome'
              color='#2196F3'
              onPress={() => alert('la password deve essere lunga almeno 6 caratteri')}
              underlayColor='#3F51B5ff'
              reverse
              />
              <View>
                <FormLabel>Password</FormLabel>
                <FormInput 
                  onChangeText={(text)=>{
                    this.setState({
                      password:text
                    })
                  }}
                  inputStyle={{color:'#03A9F4'}}
                  secureTextEntry
                />
              </View>
            </View>
            <Button
            title='Accedi'
            backgroundColor='#03A9F4'
            onPress= {()=>{
              if(this.state.mail!=='' && this.state.password!==''){
                var user ={mail:this.state.mail,password: this.state.password}
                this.props.attemptLogIn(user, this.resetNavigation)
              }
            }}
            containerViewStyle={{marginTop:'5%', borderRadius:30}}
            borderRadius={30}
          ></Button>
        </Card> 
        <Button
          containerViewStyle={{ borderRadius:30}}
          title='Non hai un account? Registrati!'
          backgroundColor='#03A9F4'
          borderRadius={30}
          onPress= {()=>{
            this.props.navigation.navigate('SignIn');
          }}
        ></Button>
      </View>
    )
  }
}