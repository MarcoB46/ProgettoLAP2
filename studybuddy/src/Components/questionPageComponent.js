import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class questionPageComponent extends Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}