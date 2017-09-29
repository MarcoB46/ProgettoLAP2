import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Text as CustomText } from 'react-native-elements';

export default class HeaderSectionList extends Component {
  render() {
    //console.log(this.props)
    return (
      <View style={{backgroundColor:'#3F51B5', borderRadius:10}} >
        <CustomText h4 style={{color:'white', textAlign:'center'}}> {this.props.title} </CustomText>
      </View>
    )
  }
}