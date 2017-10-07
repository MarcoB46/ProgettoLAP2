import { connect } from 'react-redux'
import questionPageComponent from '../Components/questionPageComponent';
import {} from '../Actions/usrActions';
import {startQuestionsFetch, stopPostFetch} from '../Actions/databaseActions';

const mapStateToProps = (state) => ({
    questions: state.databaseReducer.questions,
    isLoading: state.databaseReducer.isLoading
})

const mapDispatchToProps = (dispatch)=> {
    return {
        startQuestionsFetch: () =>{ dispatch(startQuestionsFetch()) },
        stopPostFetch:()=>{dispatch(stopPostFetch())}
    }
}


const QuestionPage = connect(mapStateToProps, mapDispatchToProps)(questionPageComponent)
export default QuestionPage;