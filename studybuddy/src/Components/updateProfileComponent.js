/**
 * NOTA IMPORTANTE::
 * questo componente è una pagina quasi  completamente uguale ad userProfileInit ,
 * il motivo della sua esistenza è dato dal fatto che non mi è permesso navigare tra due screen innestati in due elementi 
 * una soluzione sarebbe usare le action della navigate ( terzo parametro ), ma comunque non lo potrei utilizare dalla def della route
 * in App.js 
 */
import React, { Component } from 'react'
import { Text, View, Image , ScrollView, Picker , TouchableHighlight } from 'react-native'
import { FormLabel, FormInput , Button,Card, ListItem, Avatar, Text as CustomText, FormValidationMessage } from 'react-native-elements';
import firebase from '../Common/firebase';
import { NavigationActions } from 'react-navigation';

export default class UpdateProfileComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      userName:this.props.user.userName,
      corsi:[],
      selectedCourse:'VOID', 
      errorLabelPickerVisible:false,
      errorLabelUserNameVisible:false
    }
    this.resetNavigation=this.resetNavigation.bind(this);
    this.props.getCourses=this.props.getCourses.bind(this);
    this.submitHandler=this.submitHandler.bind(this);
    this.props.getCourses();
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

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.corsi){
      this.setState({
        corsi:[{corso:'Seleziona dalla lista ...', key:'VOID'} , ...nextProps.corsi]
      });
    }
  }
  
  submitHandler=()=>{
    if(this.state.userName.replace(/\s/g, '')!=='' && this.state.selectedCourse!=='VOID'){  
      this.props.setUserName(this.state.userName);
      this.props.setCourseId(this.state.selectedCourse);
      this.props.setEOI(true);
      this.props.navigation.navigate('MiddleStackScreen'); //old MiddleStackScreen
      //TODO, AGGIUNGERE NAVIGAZIONE ALLA NUOVA PAGINA E CARICAMENTO DEGLI ELEMENTI
    }else{
      if(this.state.userName.replace(/\s/g, '')===''){ this.setState({errorLabelUserNameVisible:true});} else{ this.setState({errorLabelUserNameVisible:false}); }
      console.log(this.state.userName)
      if(this.state.selectedCourse === 'VOID') this.setState({errorLabelPickerVisible:true});
    }
  }

  render() {
    
    return (
      <View style={{justifyContent: 'space-around', flex:1}}>
        <CustomText h3 style={{alignSelf:'center'}}>Personalizza il tuo account</CustomText>

        { this.props.user.photoURL
            ?
            <Avatar
            xlarge
            rounded
            source={{uri: this.props.user.photoURL}}
            onPress={() =>{
              this.props.takePhoto({target:'userPhoto'});
              }}
            activeOpacity={0.7}
            containerStyle={{alignSelf:'center', backgroundColor:'#03A9F4'}}
          />
          :
          <Avatar
            xlarge
            rounded
            icon={{name: 'camera', type: 'font-awesome'}}
            onPress={() =>{
              this.props.takePhoto({target:'userPhoto'});
              }}
            activeOpacity={0.7}
            containerStyle={{alignSelf:'center', backgroundColor:'#03A9F4'}}
          />    
        }

        <View>
          
          <View>
            <FormLabel>Username</FormLabel>
            <FormInput
                value={this.state.userName}
              onChangeText={(text)=>{
                this.setState({
                  userName:text,
                  errorLabelUserNameVisible:false
                })
              }}
            />
            <FormValidationMessage>{this.state.errorLabelUserNameVisible ? "Per procedere inserisci prima un Username":""}</FormValidationMessage>
          </View>
         
          <View>
            <FormLabel>Seleziona il tuo corso di laurea</FormLabel>
              <Picker
              selectedValue={this.state.selectedCourse}
              onValueChange={(itemValue, itemIndex)=>{
                  this.setState({
                  selectedCourse:itemValue, 
                  errorLabelPickerVisible:false
                  })
              }}
              style={{margin:'4%'}}
              >
              {
                this.state.corsi.map(element =>
                  <Picker.Item label={element.corso} value={element.key} key={element.key}/>
                )
              }
              </Picker>
              <FormValidationMessage>{this.state.errorLabelPickerVisible ? "Per procedere seleziona prima un Corso":""}</FormValidationMessage>
          </View>

        </View>

        <Button
            large
            raised 
            backgroundColor='#FF9800'
            icon={{name: 'check', type: 'font-awesome'}}
            onPress={()=>{
              {/* firebase.auth().signOut()
              .then(() => {
                console.log('User signed out successfully');
                this.resetNavigation('LogIn');
              })
              .catch((error)=>{console.log(error)}); */}
              this.submitHandler();
            }}
            title='Aggiorna' />

      </View>
    )
  }
}