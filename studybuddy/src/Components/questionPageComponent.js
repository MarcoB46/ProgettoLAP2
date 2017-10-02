import React, { Component } from 'react';
import { Text, ScrollView, View, FlatList, TouchableHighlight } from 'react-native';
import QuestionListElement from '../Common/questionListElement';
import {Spinner} from '../Common/spinner';
import {Icon} from 'react-native-elements';
import { StackNavigator} from 'react-navigation';


export default class questionPageComponent extends Component {

  constructor(props){
    super(props);

  }

  componentWillMount = () => {
    //metto in loading, avvio il listener ,scarico le question( ultime 100 ), finisco il caricamento e mostro la scroolview
    this.props.startQuestionFetch()
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
          renderItem={ ({item})=>{
            return(
              <QuestionListElement author={item.author} avatar={item.avatar} text={item.text} key={item.key} images={item.images} comments={item.comments} callback={navigate}/>
              )
          }}
          //extraData={this.props.questions} //controllare
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

//bottom: '7%',left:'80%'