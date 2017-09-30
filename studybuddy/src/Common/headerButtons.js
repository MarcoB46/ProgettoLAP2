import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
//import {} from '../Actions/databaseActions';

const mapStateToProps = (state) => ({
//impostare il corso selezionato da qua
})

const mapDispatchToProps = (dispatch)=> {
  return {
     //azioni per impostare favoriti e notifiche 
  }
}

class HeaderButtonsComponent extends Component {

  constructor(props){
    super(props);
    this.onPressHandler=this.onPressHandler.bind(this);
    this.state={
        reversedBell:false,
        reversedHeart:false
    }
  }

  onPressHandler=()=>{

  }

render() {
    return (
        <View style={{flexDirection:'row', padding:5}}>
            <Icon
                underlayColor='white'
                //raised={false}
                name='heart'
                type='font-awesome'
                reverse={this.state.reversedHeart}
                raised
                size={22}
                color='#F44336'
                onPress={() => this.setState({reversedHeart: !this.state.reversedHeart})} /> 
            <Icon
                underlayColor='white'
                //raised={false}
                name='bell'
                type='font-awesome'
                reverse={this.state.reversedBell}
                raised
                size={22}
                color='#FF9800'
                onPress={() => this.setState({reversedBell: !this.state.reversedBell})} /> 
                
        </View>
    )
    }
}

const HeaderButtons = connect(mapStateToProps, mapDispatchToProps)(HeaderButtonsComponent)
export default HeaderButtons;