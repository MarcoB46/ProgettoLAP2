import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, FlatList} from 'react-native';
import firebase from './firebase';


export default class Chat extends React.Component {
    
      constructor(props){
        super(props);
        this.state={
          message:'',
          messaggi:[]
        };
       this.onPressHandlerSend=this.onPressHandlerSend.bind(this);
      }
    
    
    
    
      componentWillMount = () => {
        firebase.messaging().onMessage((message)=>{
          console.log('notifica ricevuta :: ', message);
          alert(JSON.stringify(message));
          firebase.messaging().createLocalNotification(message);
        })
    
        firebase.messaging().getInitialNotification()
          .then((notification)=>{
            console.log('notifica che ha aperto la app :: ',notification);
          })
          
          
          itemsRef= firebase.database().ref(`/users/messages`);
          itemsRef.on('value', (dataSnapshot) => {     
            var _arr=[];
            this.setState({messaggi:[]})
              dataSnapshot.forEach((child) => {             
        
                      _arr.push({
                        author:child.val().author,
                        text: child.val().text,
                        key: child.key,
                      }) 
                  
                   
                  });    
                  this.setState({
                    messaggi:_arr
                  })
                  console.log('state messaggi :::::::::',this.state.messaggi)
              });
    
      }
      
    
      render() {
        return (
          <View style={styles.container}>
            
            <FlatList
                    style={{flex:1, width:'90%'}}
                    data={this.state.messaggi}
                    renderItem={({item}) => 
                    <View style={{margin:5, borderRadius:20, borderColor:'green', borderWidth:2,minHeight:40,padding:15}}>
                    <Text>{item.author}::: {item.text}</Text>
                    </View>
                    }
                    
                    extraData={this.state.messaggi}
                    
                   
            />

            <View style={{ flexDirection:'row', justifyContent:'flex-end' }}>
              <TextInput
                style={{width:'70%', paddingLeft:30, marginLeft:30}}
                placeholder='scrivi un messaggio'
                value={this.state.message}
                onChangeText={(text)=>{
                  this.setState({
                    message:text
                  })
                }}
              ></TextInput>
              <Button
                title='invia'
                onPress={()=>this.onPressHandlerSend()}
              ></Button>
            </View>
    
          </View>
        );
      }
    
      onPressHandlerSend=()=>{
        firebase.database()
          .ref('/users/messages')
          .push({author:firebase.auth().currentUser.email, text:this.state.message}, ()=>{
            this.setState({message:''})
          })
      }
    }
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    