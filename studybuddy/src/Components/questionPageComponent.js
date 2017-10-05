import React, { Component } from 'react';
import { Text, ScrollView, View, FlatList, TouchableHighlight } from 'react-native';
import QuestionListElement from '../Common/questionListElement';
import {Spinner} from '../Common/spinner';
import {Icon, Card} from 'react-native-elements';
import { StackNavigator} from 'react-navigation';


export default class questionPageComponent extends Component {

  constructor(props){
    super(props);

  }

  componentWillMount = () => {
    this.props.startQuestionsFetch()
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
          data={this.props.questions} 
          ListEmptyComponent={()=>{
            return(
              <Card>
                <Text style={{color:'#2196F3', textAlign:'center'}}> Nessun contenuto da Visualizzare :( </Text>
              </Card>
            )
          }}
          renderItem={ ({item})=>{
            return(
              <QuestionListElement author={item.author} avatar={item.avatar} 
                text={item.text} type={item.type} _key={item._key} 
                images={item.images} date={item.date} comments={item.comments} callback={navigate}/>
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
                  navigate('NewQuestion');
                }} 
                /> 
      </View>
    )
  }

}