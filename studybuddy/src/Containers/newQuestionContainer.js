import { connect } from 'react-redux'
import NewQuestionComponent from '../Components/newQuestionComponent'
import {takePhoto, removePhoto} from '../Actions/usrActions'; //creare action per listen su notifiche
import {sendPost} from '../Actions/databaseActions'; //creare action per push del commento e per l'inserimento delle question nella lista personale dell'utente

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
