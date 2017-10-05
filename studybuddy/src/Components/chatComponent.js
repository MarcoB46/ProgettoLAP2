import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { GiftedChat , Send} from 'react-native-gifted-chat';
import {Icon} from 'react-native-elements';

export default class ChatComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            messages:[] //momentaneo, usare props in futuro
        }
    }
    
      componentWillMount() {
        this.setState({
          messages: [
            {
              _id: 1,
              text: 'Hello developer',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://facebook.github.io/react/img/logo_og.png',
              },
            },
          ],
        });
      }
    
      onSend(messages = []) {
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));
      }
    
      render() {
        return (
          <GiftedChat
            messages={this.state.messages}
            placeholder='Scrivi qualcosa ... '
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: this.props.user.id,
              name: this.props.user.userName,
              avatar:this.props.user.photoURL
            }}
            locale='it'
            renderSend={(props)=> {
                return (
                    <Send
                        {...props}
                    >
                        <View style={{marginRight: 10, marginBottom: 5}}>
                            <Icon reverse size={12} color='#304FFE' name='paper-plane' type='font-awesome' />
                        </View>
                    </Send>
                );
            }}
          />
        );
      }
}