import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { GiftedChat , Send, Bubble} from 'react-native-gifted-chat';
import {Icon, FormLabel} from 'react-native-elements';
 
export default class ChatComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            messages:this.props.messages
        }
    }
      renderBubble(props) {
        if (props.isSameUser(props.currentMessage, props.previousMessage) && props.isSameDay(props.currentMessage, props.previousMessage)) {
          return (
            <Bubble
              {...props}
            />
          );
        }
        return (
          <View>
            <FormLabel>{props.currentMessage.user.name}</FormLabel>
            <Bubble
              {...props}
            />
          </View>
        );
      }

      componentWillMount() {
        this.props.startChatFetch();
      }
    
      componentWillUnmount = () => {
        this.props.stopChatFetch();
      }
      

      onSend(message = []) {
        this.props.sendMessage(GiftedChat.append(this.props.messages, message));
      }
    
      render() {
        return (
          <GiftedChat
            messages={this.props.messages}
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
            renderBubble={this.renderBubble}
          />
        );
      }
}