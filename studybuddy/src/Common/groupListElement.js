import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image , FlatList, Modal} from 'react-native';
import { Text as CustomText, Card, Badge, Avatar, Button, Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import {setDetailParameters} from '../Actions/databaseActions'
//import {} from '../Actions/databaseActions';

const mapStateToProps = (state) => ({
    user:state.usrReducer.user, 
})

const mapDispatchToProps = (dispatch)=> {
  return {
      setDetailParameters: (param)=>{dispatch(setDetailParameters(param))}
  }
}

class GroupListElementComponent extends Component {

  constructor(props){
    super(props);
    this.state={
        detailURI:'',
        modalImageVisible:false
    }
    this.setModalVisible=this.setModalVisible.bind(this);
  }

  setModalVisible(visible, uri='') {
    this.setState({modalImageVisible: visible, detailURI:uri });
  }

  

  render() {
    return (
        <View style={{marginBottom:'4%'}}>
            <Card>
                <TouchableHighlight onPress={ ()=> {
                    console.log('====================================');
                    console.log('elemento premuto ::: ', this.props);
                    console.log('====================================');
                    this.props.setDetailParameters({ 
                        text:this.props.text, 
                        avatar:this.props.avatar, author:this.props.author, 
                        comments:this.props.comments, date:this.props.date , 
                        numberOfPersons: this.props.numberOfPersons, LatLng:this.props.LatLng,
                        targetDate:this.props.targetDate, placeGID:this.props.placeGID,
                        placeName:this.props.placeName, _key:this.props._key, type:this.props.type,
                        buddyList:this.props.buddyList, userUID:this.props.userUID
                    });
                    this.props.callback('ElementDetail');
                    } } underlayColor='#3F51B5AA' >   
                    <View>
                        <View style={{flexDirection:'row', marginBottom:'3%'}}>
                            <Avatar
                                    small
                                    rounded
                                    source={{uri: this.props.avatar}}
                                    activeOpacity={0.7}
                                    containerStyle={{justifyContent:'flex-start', backgroundColor:'#03A9F4'}}
                                />
                            <CustomText h4 style={{textAlign:'center', marginLeft:'2%'}} > {this.props.author} </CustomText>
                        </View>
                        <Text ellipsizeMode='tail' numberOfLines={6} > 
                            {this.props.text}
                        </Text>
                        <View
                            style={{
                                marginTop:10, 
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }}
                            />
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ flex:1}} > 
                                {this.props.placeName} 
                            </Text>
                            
                            <Text ellipsizeMode='tail' numberOfLines={1}  style={{flex:1, textAlign:'right'}}> 
                            {this.props.targetDate.date}
                            </Text>
                        </View>


                    </View>
                    
                </TouchableHighlight>            
                <View style={{marginTop:'4%'}}>
                    <Badge containerStyle={{ backgroundColor: '#E8EAF6', alignSelf:'flex-start'}}>
                        <Text> {this.props.buddyList.length}/{this.props.numberOfPersons+1} </Text>
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
                        onPress={()=>{ this.setModalVisible(false) }}
                    /> 
                </View>
            </Modal>
        </View>       

    )
  }
}

const GroupListElement = connect(mapStateToProps, mapDispatchToProps)(GroupListElementComponent)
export default GroupListElement;