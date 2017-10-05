import { connect } from 'react-redux'
import ChatComponent from '../Components/chatComponent'


const mapStateToProps = (state) => ({
    user:state.usrReducer.user,
    isLoading: state.databaseReducer.isLoading,
    selectedCourse:state.databaseReducer.selectedCourse,
    selectedSubject:state.databaseReducer.selectedSubject,
})

const mapDispatchToProps =  (dispatch)=> {
    return {
        
    }
}


const Chat= connect(mapStateToProps, mapDispatchToProps)(ChatComponent)
export default Chat;