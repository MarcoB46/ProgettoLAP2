import { connect } from 'react-redux'
import NewQuestionComponent from '../Components/newQuestionComponent'
import {takePhoto, removePhoto} from '../Actions/usrActions'; 
import {sendPost} from '../Actions/databaseActions';

const mapStateToProps = (state) => ({
    postPhoto:state.usrReducer.postPhoto
})

const mapDispatchToProps = (dispatch)=> {
    return {
        takePhoto:(param)=>{dispatch(takePhoto(param))},
        removePhoto:(param)=>{dispatch(removePhoto(param))},
        sendPost:(param=>{dispatch(sendPost(param))})
    }
}

const NewQuestion = connect(mapStateToProps, mapDispatchToProps)(NewQuestionComponent)
export default NewQuestion;
