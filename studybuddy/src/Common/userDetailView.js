import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux';
import {DrawerItems, NavigationActions} from 'react-navigation';
import {Avatar, Text, Button} from 'react-native-elements';
import { logOut } from '../Actions/usrActions';

const mapStateToProps = (state) => ({
    user:state.usrReducer.user, 
})

const mapDispatchToProps = (dispatch)=> {
  return {
    logOut:(callback, target) =>{dispatch(logOut(callback, target))}
  }
}


class UserDetailViewComponent extends Component {

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
        this.props.params.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View style={{flex:1 , justifyContent:'space-between'}}>
                <View style={{ backgroundColor:'#3F51B5', flexDirection:'row'}}>
                    <Avatar
                        medium
                        rounded
                        source={{uri: this.props.user.photoURL}}
                        containerStyle={{margin:10}}
                    />
                    <Text h3 style={{ flex:1,textAlign:'center', color:'white', margin:10}}>{this.props.user.userName}</Text>
                </View>
                <View style={{flex:1}}>
                    <DrawerItems {...this.props.params} />
                </View>

                <Button
                    title='Log Out'
                    icon={{name:'sign-out', type:'font-awesome'}}
                    backgroundColor='#F44336'
                    containerViewStyle={{margin:10}}
                    onPress={()=>{this.props.logOut(this.props.params.navigation.navigate, 'LogIn')}}
                />
            </View>
        )
    }
}


const UserDetailView = connect(mapStateToProps, mapDispatchToProps)(UserDetailViewComponent)
export default UserDetailView;