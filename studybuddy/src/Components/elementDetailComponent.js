import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image , FlatList, Modal, ScrollView} from 'react-native';
import { Text as CustomText, Card, Badge, Avatar, Button, Icon} from 'react-native-elements';

export default class ElementDetailComponent extends Component {
  constructor(props){
    super(props);
    this.state={
        detailURI:'',
        modalImageVisible:false
    }
    this.setModalVisible=this.setImageModalVisible.bind(this);
    this.getData=this.getData.bind(this);
  }

  getData=()=>{
    var data = new Date(this.props.navigation.state.params.data);
    var mm, gg, aa, min, hr;
    mm=data.getDate();
    gg=data.getDay();
    aa=data.getFullYear();
    min=data.getMinutes();
    hr=data.getHours();
    var postDate= gg+'/'+mm+'/'+aa+' - '+hr+':'+min;
    return postDate
  }

  setImageModalVisible(visible, uri='') {
    this.setState({modalImageVisible: visible, detailURI:uri });
  }

  render() {
    
    return (
        <View style={{marginBottom:'4%', flex:1}}>
            <Card containerStyle={{flex:1}}>
                
              <View>
                  <View style={{flexDirection:'row', alignItems:'center', marginBottom:'3%'}}>
                      <Avatar
                              large
                              rounded
                              source={{uri: this.props.navigation.state.params.avatar}}
                              activeOpacity={0.7}
                              containerStyle={{justifyContent:'flex-start', backgroundColor:'#03A9F4'}}
                          />
                      <CustomText h4 style={{flex:1, textAlign:'center', marginLeft:'2%'}} > {this.props.navigation.state.params.author} </CustomText>
                  </View>
                  <ScrollView style={{ margin:'5%' , height:'30%'}}>
                    <Text> 
                        {this.props.navigation.state.params.text}
                    </Text>
                  </ScrollView>

              </View>

              {
                  this.props.navigation.state.params.images
                  ?
                  <FlatList
                      data={this.props.navigation.state.params.images}
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
            
              <View style={{marginTop:'4%', flexDirection:'row', justifyContent:'space-between'}}>
                  <Badge containerStyle={{ backgroundColor: '#E8EAF6', alignSelf:'flex-start'}}>
                      <Text>Risposte : {this.props.navigation.state.params.comments ? this.props.navigation.state.params.comments.lenght() : 0 } </Text>
                  </Badge>
                  <Badge containerStyle={{ backgroundColor: '#E8EAF6', alignSelf:'flex-start'}}>
                      <Text> {this.getData()} </Text>
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
        </View>       
    )
  }
}