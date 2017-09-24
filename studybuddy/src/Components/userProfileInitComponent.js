import React, { Component } from 'react'
import { Text, View, Image , ScrollView, Picker} from 'react-native'
import { FormLabel, FormInput , Button,Card, ListItem, Avatar, Text as CustomText } from 'react-native-elements';
import firebase from '../Common/firebase';
import { NavigationActions } from 'react-navigation';

export default class UserProfileInitComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      debugText:'',
      refText:null,
    }
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
      <View style={{justifyContent: 'space-around', flex:1}}>
        <CustomText h3 style={{alignSelf:'center'}}>Personalizza il tuo account</CustomText>
        <Avatar
          xlarge
          rounded
          title="MB"
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          containerStyle={{alignSelf:'center'}}
        />
        <View>
          <FormLabel>Username</FormLabel>
          <FormInput
            onChangeText={(text)=>{
              this.setState({
                debugText:text
              })
            }}
          />
          <FormLabel>Seleziona il tuo corso di laurea</FormLabel>
          <Picker
            onValueChange={(itemValue, itemIndex)=>{
              this.setState({
                debugText:itemValue
              })
            }}
            style={{backgroundColor:'#81D4FA', marginHorizontal:'4%', borderRadius:30}}
          >
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
            <Picker.Item label='prova1' value='prova1'/>
          </Picker>
          
         
        </View>
        <Button
            large
            raised 
            backgroundColor='#FF9800'
            icon={{name: 'user-circle', type: 'font-awesome'}}
            onPress={()=>{
              firebase.auth().signOut()
              .then(() => {
                console.log('User signed out successfully');
                this.resetNavigation('SignIn');
              })
              .catch((error)=>{console.log(error)});
            }}
            title='logout' />
      </View>
    )
  }
}