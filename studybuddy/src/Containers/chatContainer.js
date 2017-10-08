import { connect } from 'react-redux'
import ChatComponent from '../Components/chatComponent'
import { startChatFetch, stopChatFetch, sendMessage} from '../Actions/databaseActions'

const mapStateToProps = (state) => ({
    user:state.usrReducer.user,
    isLoading: state.databaseReducer.isLoading,
    messages: state.databaseReducer.messaggi,
})

const mapDispatchToProps =  (dispatch)=> {
    return {
        startChatFetch:()=>{dispatch(startChatFetch())},
        stopChatFetch:()=>{dispatch(stopChatFetch())},
        sendMessage:(messages)=>{dispatch(sendMessage(messages))}
    }
}

const Chat= connect(mapStateToProps, mapDispatchToProps)(ChatComponent)
export default Chat;