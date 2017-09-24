import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { FormLabel, FormInput , Button,Card, ListItem, Avatar} from 'react-native-elements';

export default class UserProfileInitComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      debugText:'',
      refText:null,
    }
  }
   users = [
    {
       name: 'brynn',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
   // more users here
   ];
  render() {
    
    return (
      <View>

<Card title="CARD WITH DIVIDER">
  {
    this.users.map((u, i) => {
      return (
        <View key={i} >
          <Avatar
            source={{uri:u.avatar}}
            xlarge
            rounded
          />
          <Text>{u.name}</Text>
        </View>
      );
    })
  }
</Card>

        <View>
          <FormLabel>Campo1</FormLabel>
          <FormInput
            onChangeText={(text)=>{
              this.setState({
                debugText:text
              })
            }}
          />
          <Button
            large
            raised 
            backgroundColor='#FF9800'
            icon={{name: 'user-circle', type: 'font-awesome'}}
            onPress={()=>{
              alert('premuto')
            }}
            title='LARGE WITH RIGHT ICON' />
        </View>
 
      </View>
    )
  }
}