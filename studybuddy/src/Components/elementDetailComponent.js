import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image , FlatList, Modal, ScrollView} from 'react-native';
import { Text as CustomText, Card, Badge, Avatar, Button, Icon} from 'react-native-elements';
import moment from 'moment';
import momentITA from 'moment/locale/it';
import MapView from 'react-native-maps';
import {Spinner} from '../Common/spinner';
//inserire in componentWillReceiveProps l'aggiornamento del contatore dei partecipanti e delle risposte
export default class ElementDetailComponent extends Component {

  constructor(props){
    super(props);
    this.state={
        detailURI:'',
        modalImageVisible:false,
        modalMapVisible:false,
        modalBuddyVisible:false,
        lat: this.props.parameters.LatLng ? this.props.parameters.LatLng.lat : 37.52 ,
        lng : this.props.parameters.LatLng ? this.props.parameters.LatLng.lng : 15.07,
        date:this.props.parameters.date
    }
    moment.updateLocale('it', momentITA);
    this.setImageModalVisible=this.setImageModalVisible.bind(this);
    this.setMapModalVisible=this.setMapModalVisible.bind(this);
  }


  setBuddyListModalVisible(visible){
      this.setState({modalBuddyVisible: visible})
  }
  setImageModalVisible(visible, uri='') {
    this.setState({modalImageVisible: visible, detailURI:uri });
  }
  setMapModalVisible(visible) {
    this.setState({modalMapVisible: visible });
  }


  render() {
    
      var {parameters} = this.props;
      console.log('confronto ::::: ', parameters.userUID , " locale ::" , this.props.uid)
    if(this.props.isLoading){
        return <Spinner/>
    }else
    return (
        <View style={{marginBottom:'4%', flex:1}}>
            <Card containerStyle={{flex:1,  marginBottom:'3%' }} wrapperStyle={{flex:1, justifyContent:'space-between'}} >
                

                  <View style={{flexDirection:'row', alignItems:'center', marginBottom:'3%'}}>
                      <Avatar
                              large
                              rounded
                              source={{uri: parameters.avatar}}
                              activeOpacity={0.7}
                              containerStyle={{justifyContent:'flex-start', backgroundColor:'#03A9F4'}}
                          />
                      <CustomText h4 style={{flex:1, textAlign:'center', marginLeft:'2%'}} > {parameters.author} </CustomText>
                  </View>
                  <View style={{flex:0.5}}>
                  <ScrollView style={{ margin:'2%' , height:'30%'}}>
                  <Text> 
                      {parameters.text}
                  </Text>

                  
                </ScrollView>
                {
                    
                       parameters.type === 'g' && parameters.userUID!== this.props.uid  ? (

                        ( parameters.buddyList && parameters.buddyList.findIndex(element => element.uid===this.props.uid) == -1 ) || ( !parameters.buddyList )
                            ?
                        <Button
                            title='Partecipa' //inserire un controllo se si sta partecipando o meno
                            containerViewStyle={{marginTop:10 }}
                            small
                            icon={{name: 'ticket', type: 'font-awesome'}}
                            backgroundColor='#FF9800'
                            onPress={()=>{
                               
                                if(((parameters.numberOfPersons+1) > parameters.buddyList.length) || (parameters.numberOfPersons == 10)){
                                
                                    this.props.joinGroup();
                                    this.props.subscribe('post', parameters._key);
                                }else{
                                    alert('È stato raggiunto il limite di persone richiesto dal creatore del post!')
                                }
                            }}
                         />
                            :
                        <Button
                            title='Lascia Gruppo' 
                            containerViewStyle={{marginTop:10 }}
                            small
                            icon={{name: 'ticket', type: 'font-awesome'}}
                            backgroundColor='#F44336'
                            onPress={()=>{
                               this.props.leaveGroup();
                               this.props.unsubscribe( 'post', parameters._key );
                            }}
                         />
                       ):null
                   } 
                  </View>
                <ScrollView contentContainerStyle={{flex:1}} style={{ height:'100%' ,margin:10}} >

                  
                    {
                        parameters.placeName && !this.props.isLoading?(

                            <View style={{flex:1}}>
                                <Text style={{ margin:5}}>{parameters.placeName}</Text>
                                <Text style={{color:'#2196F3', margin:5}} >{parameters.targetDate.date}</Text>
                                <View>
                                    <Text> Numero massimo di persone : {parameters.numberOfPersons===10 ? 'nesssun limite' : parameters.numberOfPersons+1}  </Text>
                                </View>
                                <Button
                                    title='Guarda sulla mappa' //inserire un controllo se si sta partecipando o meno
                                    containerViewStyle={{marginTop:10 }}
                                    small
                                    icon={{name: 'map', type: 'font-awesome'}}
                                    backgroundColor='#2196F3'
                                    onPress={()=>{
                                        this.setMapModalVisible(true)
                                    }}
                                />

                                <Button
                                    title='Guarda lista partecipanti' //inserire un controllo se si sta partecipando o meno
                                    containerViewStyle={{marginTop:10 }}
                                    small
                                    icon={{name: 'list-ul', type: 'font-awesome'}}
                                    backgroundColor='#2196F3'
                                    onPress={()=>{
                                        this.setBuddyListModalVisible(true)
                                    }}
                                />
                            </View>
                        ): null
                    }

                    {
                  parameters.images
                  ?
                  <FlatList
                      data={parameters.images}
                      renderItem={({item}) => {
                          return(
                              <TouchableHighlight 
                                  onPress={() => {
                                      this.setImageModalVisible(!this.state.modalImageVisible, item.source)
                                  }}
                                  underlayColor='#3F51B5AA'    
                              >
                                  <Image source={{uri: item.source}} resizeMethod='resize' resizeMode='cover' style={{width: 200, height:200 , margin:10 }}/>
                              </TouchableHighlight>
                              )}}
                      horizontal={true}
                      keyExtractor={(item, index)=> index}
                  />
                  :
                  null
              }

                  </ScrollView>



            
              <View style={{marginTop:'4%', flexDirection:'row', justifyContent:'space-between'}}>
                {
                    parameters.buddyList ?
                        <Badge containerStyle={{ backgroundColor: '#E8EAF6', alignSelf:'flex-start'}}>
                            <Text> { 'Partecipano in : '+ parameters.buddyList.length } </Text>
                        </Badge>
                        : null
                }
                  
                  <Badge containerStyle={{ backgroundColor: '#E8EAF6', alignSelf:'flex-start'}}>
                      <Text> {this.state.date} </Text>
                  </Badge>
              </View> 
          </Card>
          <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalImageVisible}
              onRequestClose={()=>{console.log('request close')}}
          >
            <View style={{flex:1, backgroundColor:'#3F51B5AA'}}>
                <Image source={{uri: this.state.detailURI}} resizeMethod='resize' resizeMode='cover' style={{flex:1}}/>
                <Icon
                    underlayColor='white'
                    name='arrow-left'
                    type='font-awesome'
                    reverse
                    raised
                    size={35}
                    color='#F44336'
                    containerStyle={{position:'absolute', top: 0,left:0}}
                    onPress={()=>{ this.setImageModalVisible(false) }}
                /> 
            </View>
          </Modal>
          <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalMapVisible}
              onRequestClose={()=>{console.log('request close')}}
          >
          <View style={{flex:1, backgroundColor:'#3F51B5AA'}}>
            <MapView
                style={{flex:1, height:500}}
                
                region={{
                    latitude:this.state.lat,
                    longitude:this.state.lng,
                    latitudeDelta: 0.00422,
                    longitudeDelta: 0.00221
                }}
                >
                <MapView.Marker
                    title={parameters.placeName}
                    coordinate={{
                        latitude: this.state.lat,
                        longitude:this.state.lng
                    }}
                    />
            </MapView>
            <Icon
                    underlayColor='white'
                    name='arrow-left'
                    type='font-awesome'
                    reverse
                    raised
                    size={35}
                    color='#F44336'
                    containerStyle={{position:'absolute', top: 0,left:0}}
                    onPress={()=>{ this.setMapModalVisible(false) }}
                /> 
            </View>
          </Modal>

            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalBuddyVisible}
              onRequestClose={()=>{console.log('request close')}}
            >
           
            <View style={{flex:1,flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center'}}>
                            <ScrollView>
                            <FlatList
                                    data={parameters.buddyList}
                                    renderItem={({item}) => {
                                        return(
                                            <View style={{flexDirection:'row', alignItems:'center', marginBottom:'3%'}}>
                                                <Avatar
                                                        large
                                                        rounded
                                                        source={{uri: item.avatar}}
                                                        
                                                        containerStyle={{justifyContent:'flex-start', backgroundColor:'#03A9F4'}}
                                                    />
                                                <CustomText h4 style={{flex:1, textAlign:'center', marginLeft:'2%'}} > {item.userName} </CustomText>
                                            </View>
                                            )}}
                                    
                                    keyExtractor={(item, index)=> index}
                                />
                            </ScrollView>
                <Icon
                    underlayColor='white'
                    name='arrow-left'
                    type='font-awesome'
                    reverse
                    raised
                    size={30}
                    color='#F44336'
                    containerStyle={{position:'absolute', top: 0,left:0}}
                    onPress={()=>{ this.setBuddyListModalVisible(false) }}
                /> 
            </View>
               
            </Modal>
        </View>       
    )
  }
}