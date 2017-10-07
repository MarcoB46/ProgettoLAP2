import React, { Component } from 'react';
import { Text, ScrollView, View, FlatList, TouchableHighlight } from 'react-native';
import GroupListElement from '../Common/groupListElement';
import {Spinner} from '../Common/spinner';
import {Icon, Card} from 'react-native-elements';
import { StackNavigator} from 'react-navigation';

export default class groupsPageComponent extends Component {

  constructor(props){
    super(props);

  }

  componentWillMount = () => {
    this.props.startGroupsFetch()
  }
  componentWillUnmount = () => {
    this.props.stopGroupsFetch()
  }
  

  render() {
    if(this.props.isLoading){
      return (<Spinner/>) 
    }
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex:1}}>
        <FlatList
          style={{flex:1}}
          data={this.props.groups}
          ListEmptyComponent={()=>{
            return(
              <Card>
                <Text style={{color:'#2196F3', textAlign:'center'}}> Nessun contenuto da Visualizzare :( </Text>
              </Card>
            )
          }}
          renderItem={ ({item})=>{
            return(
              <GroupListElement author={item.author} 
                avatar={item.avatar} 
                text={item.text} 
                type={item.type}
                _key={item._key} 
                comments={item.comments} 
                callback={navigate} 
                date={item.date} 
                numberOfPersons={item.numberOfPersons} 
                LatLng={item.LatLng}
                targetDate={item.targetDate}
                placeGID={item.placeGID}
                placeName={item.placeName}
                buddyList={item.buddyList}
                userUID={item.userUID}
              />
              )
          }}
          keyExtractor={(item, index)=> index}
        />
        <Icon
                underlayColor='white'
                name='plus'
                type='font-awesome'
                reverse
                raised
                size={35}
                color='#F44336'
                containerStyle={{position:'absolute', bottom:0, right:0, margin:10 }}
                onPress={() => {
                  navigate('NewGroup');
                }} 
                /> 
      </View>
    )
  }

}