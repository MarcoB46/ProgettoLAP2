import React, { Component } from 'react';
import { View, FlatList , ScrollView , Image, TouchableHighlight,StyleSheet, Alert} from 'react-native';
import {Card, FormInput, Avatar, Button} from 'react-native-elements';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';

export default class NewGroupComponent extends Component {

    componentWillMount = () => {
      //this.props.removePhoto({target:'postPhotosAll'});
    }
    

    constructor(props){
        super(props);
        this.state = {
            text:''
        }
        //this.submitHandler=this.submitHandler.bind(this);
        this.openSearchModal=this.openSearchModal.bind(this);
    }

    openSearchModal() {
        RNGooglePlaces.openPlacePickerModal() //controllare questo :: https://github.com/tolu360/react-native-google-places
        .then((place) => {
            console.log(place);
            // place represents user's selection from the
            // suggestions and it is a simplified Google Place object.
        })
        .catch(error => console.log(error.message));
      }
    

    submitHandler = ()=>{
        if(this.state.text===''){ //filtro superficiale
            Alert.alert('Attenzione', 'Non puoi inviare un post vuoto!')
        }else{
            var toSend={
                text:this.state.text,
                date:Date.now(),
                type:'g'
            }
            this.props.sendPost(toSend);
            const {goBack} = this.props.navigation;
            goBack();
        }
    }

    render() {
        return (
            <Card containerStyle={{flex:1,  marginBottom:'3%'}}>
                
                <ScrollView style={{height:'85%', flexDirection:'column'}}>
                <View style={{backgroundColor:'#90CAF9', alignSelf:'auto' , borderRadius:25, borderWidth:1, borderColor:'#2196F3'}}>
                    <FormInput 
                            style={{color:'black'}}
                            autoCorrect={true}
                            blurOnSubmit={false}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={(newText)=>{
                                this.setState({
                                    text:newText
                                })
                            }}
                            placeholder='Inserisci una descrizione'
                            placeholderTextColor='#2196F3'
                            selectionColor='#2196F3'
                            value={this.state.text}
                        />
                </View>
                <Button
                        containerViewStyle={{marginTop:'10%' }}
                        small
                        icon={{name: 'map', type: 'font-awesome'}}
                        backgroundColor='#2196F3'
                        title='Scegli il luogo di incontro ' 
                        onPress={()=>{
                            this.openSearchModal()
                        }}
                        />
                </ScrollView>
                <Button
                        containerViewStyle={{marginTop:'10%' }}
                        small
                        icon={{name: 'paper-plane', type: 'font-awesome'}}
                        backgroundColor='#2196F3'
                        title='Posta Invito' 
                        onPress={()=>{
                            this.submitHandler();
                        }}
                        />
            </Card>            
        )
    }

}