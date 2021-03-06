import React, { Component } from 'react';
import { View, FlatList , ScrollView , Image, TouchableHighlight,StyleSheet, Alert, Text, Slider} from 'react-native';
import {Card, FormInput, Avatar, Button, FormLabel} from 'react-native-elements';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import momentITA from 'moment/locale/it';

export default class NewGroupComponent extends Component {

    constructor(props){
        super(props);
        moment.updateLocale('it', momentITA);
        this.state = {
            text:'',
            place:{
                placeName:'',
                LatLng:{
                    lat:null,
                    lng:null
                },
                placeGID:null
            }, 
            numberOfPersons:1,
            targetDate: {date:moment().add(1,'h').format('MMMM Do YYYY, HH:mm') , millis: 0 },
            placeBool:false
        }
        this.openSearchModal=this.openSearchModal.bind(this);
    }

    openSearchModal() {
        RNGooglePlaces.openPlacePickerModal()
        .then((place) => {
            this.setState({placeBool:true})
            console.log(place);
            this.setState({
                place:{
                    placeName:place.name,
                    LatLng:{
                        lat:place.latitude,
                        lng:place.longitude
                    },
                    placeGID: place.placeID
                }
            })
        })
        .catch(error => console.log(error.message));
      }
    

    submitHandler = ()=>{
        if(this.state.text==='' || !this.state.placeBool  ){ 
            Alert.alert('Attenzione', 'Compila prima tutti i campi !')
        }else{
            var toSend={
                text:this.state.text,
                date:moment().format('MMMM Do YYYY, HH:mm'),
                type:'g',
                placeName:this.state.place.placeName,
                LatLng:this.state.place.LatLng,
                placeGID:this.state.place.placeGID,
                numberOfPersons:this.state.numberOfPersons,
                targetDate:this.state.targetDate,
                userUID:this.props.user.id,
                buddyList:[{
                    avatar:this.props.user.photoURL,
                    uid:this.props.user.id,
                    userName:this.props.user.userName
                }]    
            }
            this.props.sendPost(toSend);
            const {goBack} = this.props.navigation;
            goBack();
        }
    }

    render() {
        return (
            <Card containerStyle={{flex:1,  marginBottom:'3%' }} wrapperStyle={{flex:1, justifyContent:'space-between'}} >          
                <View style={{backgroundColor:'#90CAF9', borderRadius:25, borderWidth:1, borderColor:'#2196F3'}}>
                    <FormInput 
                        style={{color:'black'}}
                        autoCorrect={true}
                        blurOnSubmit={false}
                        multiline={true}
                        numberOfLines={5}
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
                <View>
                    <Text style={{color:'#3D5AFE', margin:5}} > {this.state.place.placeName} </Text>
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
                </View>
                <View>
                    <FormLabel> Quante persone possono partecipare ? </FormLabel>
                    <FormLabel> Attuale: {(this.state.numberOfPersons==10)? 'Nessun limite' : this.state.numberOfPersons} </FormLabel>
                    <Slider
                        maximumValue={10}
                        minimumValue={1}
                        onValueChange={(value)=>{
                            this.setState({
                                numberOfPersons:value
                            })
                        }}
                        step={1}
                        value={1}
                        style={{marginTop:'2%'}}
                    />
                    <DatePicker
                        style={{width: 200, margin:10}}
                        date={this.state.targetDate.date}
                        mode="datetime"
                        placeholder="Seleziona la Data"
                        format='MMMM Do YYYY, HH:mm'
                        is24Hour={true}
                        
                        minDate={new Date()}
                        maxDate="2018-06-01"
                        confirmBtnText="Conferma"
                        cancelBtnText="Annulla"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        
                        }}
                        onDateChange={(date) => {
                            if(moment(date, 'MMMM Do YYYY, HH:mm').isBefore(moment())) {
                                alert('Non puoi creare incontri nel passato !')
                                return
                            }
                            this.setState({targetDate: {date:date, millis:moment(date, 'MMMM Do YYYY, HH:mm').unix() }})
                        }}
                    />

                </View>
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