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

class QuestionListElementComponent extends Component {

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
                    this.props.setDetailParameters({ text:this.props.text, avatar:this.props.avatar,
                     author:this.props.author,images:this.props.images , comments:this.props.comments, type:this.props.type,
                     date:this.props.date , _key:this.props._key});
                     this.props.callback('ElementDetail');
                    } }
                    underlayColor='#3F51B5AA' >   
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
                    </View>
                    
                </TouchableHighlight>
           
                    {
                        this.props.images
                        ?
                        <FlatList
                            data={this.props.images}
                            renderItem={({item}) => {
                                return(
                                    <TouchableHighlight 
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalImageVisible, item.source)
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
            
                <View style={{marginTop:'4%'}}>
                    <Badge containerStyle={{ backgroundColor: '#E8EAF6', alignSelf:'flex-start'}}>
                        <Text>{this.props.date} </Text>
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
                    <Image source={{uri: this.state.detailURI}} resizeMethod='resize' resizeMode='contain' style={{flex:1}}/>
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

const QuestioListElement = connect(mapStateToProps, mapDispatchToProps)(QuestionListElementComponent)
export default QuestioListElement;