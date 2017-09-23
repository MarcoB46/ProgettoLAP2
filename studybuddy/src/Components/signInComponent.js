import React, { Component } from 'react'
import { Text, View , Button} from 'react-native'
import { NavigationActions } from 'react-navigation';

export default class signInComponent extends Component {
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
        <Text> ciao mondo </Text>
        <Button
          title='naviga senza back'
          onPress= {()=>{
            this.resetNavigation('LogIn');
          }}
        ></Button>
      </View>
    )
  }
}