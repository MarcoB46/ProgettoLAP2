import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class componentName extends Component {
  constructor(props){
    super(props);
    this.resetNavigation=this.resetNavigation.bind(this);
  }

  resetNavigation= (targetRoute) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View>
        
        <Button
          title='vai a modificare il tuo profilo'
          onPress= {()=>{
            this.resetNavigation('UserProfileInit');
          }}
        ></Button>
      </View>
    )
  }
}