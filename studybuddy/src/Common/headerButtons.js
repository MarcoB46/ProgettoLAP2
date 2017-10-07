import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { subscribe, unsubscribe } from '../Actions/usrActions';
//import {} from '../Actions/databaseActions';

const mapStateToProps = (state) => ({
//impostare il corso selezionato da qua 
    subscribed: state.usrReducer.subscribed
})

const mapDispatchToProps = (dispatch)=> {
  return {
     subscribe:()=>{dispatch(subscribe('subject'))},
     unsubscribe:()=>{dispatch(unsubscribe('subject'))}
  }
}

class HeaderButtonsComponent extends Component {

  constructor(props){
    super(props);
    this.state={
        reversedBell: this.props.subscribed
    }
    this.subscribe=this.subscribe.bind(this);
    this.unsubscribe=this.unsubscribe.bind(this);
  }

  subscribe=()=>{
    this.props.subscribe()
  }

  unsubscribe=()=>{
    this.props.unsubscribe()
  }

render() {
    return (
        <View style={{flexDirection:'row', padding:5}}>
            <Icon
                underlayColor='white'
                //raised={false}
                name='bell'
                type='font-awesome'
                reverse={this.state.reversedBell}
                raised
                size={22}
                color='#FF9800'
                onPress={() => {
                    this.setState({reversedBell: !this.state.reversedBell})
                    if(this.state.reversedBell){
                        this.props.unsubscribe();
                    }else{
                        this.props.subscribe();
                            }     
                    }} /> 
                
        </View>
    )
    }
}

const HeaderButtons = connect(mapStateToProps, mapDispatchToProps)(HeaderButtonsComponent)
export default HeaderButtons;