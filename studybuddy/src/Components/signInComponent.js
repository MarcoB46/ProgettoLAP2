import React, { Component } from 'react'
import { View } from 'react-native'
import { NavigationActions } from 'react-navigation';
import { FormLabel, FormInput , Button, Icon, Text, Card,SocialIcon} from 'react-native-elements';

export default class signInComponent extends Component {
  constructor(props){
    super(props);
    this.resetNavigation=this.resetNavigation.bind(this);
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
        <View>
          {/* <Icon
            raised
            name='graduation-cap'
            type='font-awesome'
            
            color='#03A9F4'
            containerStyle={{ alignSelf:'center'}}
            /> */}
          <Text h1 style={{alignSelf:'center', color:'white'}} > Benvenuto ! </Text>
        </View>

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
                  //containerStyle={{ width:'68%'}}
                  onChangeText={(text)=>{
                    this.setState({
                      mail:text
                    })
                  }}
                  inputStyle={{color:'#03A9F4'}}
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
                  //containerStyle={{marginRight:50, width:'68%'}}
                  onChangeText={(text)=>{
                    this.setState({
                      mail:text
                    })
                  }}
                  inputStyle={{color:'#03A9F4'}}
                />
              </View>
            </View>
            <Button
            title='Registrati'
            backgroundColor='#03A9F4'
            onPress= {()=>{
              this.resetNavigation('UserProfileInit');
            }}
            containerViewStyle={{marginTop:'5%', borderRadius:30}}
            borderRadius={30}
          ></Button>
          <SocialIcon
            title='Sign In With Facebook'
            button
            type='facebook'
          />
        </Card>

        <Button
        containerViewStyle={{marginBottom:'5%'}}
          title='Hai già un account? Accedi!'
          backgroundColor='#03A9F4'
          onPress= {()=>{
            this.resetNavigation('LogIn');
          }}
        ></Button>
      </View>
    )
  }
}