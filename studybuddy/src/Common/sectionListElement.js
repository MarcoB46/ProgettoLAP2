import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Text as CustomText} from 'react-native-elements';
import { connect } from 'react-redux';
import {setSubject} from '../Actions/databaseActions';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch)=> {
  return {
      setSubject:(subjectId)=>{dispatch(setSubject(subjectId))}
  }
}

class SectionListElementComponent extends Component {

  constructor(props){
    super(props);
    this.onPressHandler=this.onPressHandler.bind(this);
  }

  onPressHandler=()=>{
    this.props.setSubject(this.props.codice);
    this.props.callback('MainTabScreen');
  }

  render() {
    //console.log(this.props)
    return (
      <View style={{margin:'2%', borderColor:'#E8EAF6', borderWidth:2, borderRadius:10}}>
        <TouchableHighlight  
          underlayColor='#E8EAF6'
          onPress={()=>{
            this.onPressHandler();
          }}>
          <View>
            <CustomText style={{textAlign:'center', fontSize:20}}  > {this.props.title} </CustomText>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const SectionListElement = connect(mapStateToProps, mapDispatchToProps)(SectionListElementComponent)
export default SectionListElement;