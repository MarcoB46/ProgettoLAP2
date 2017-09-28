import { connect } from 'react-redux'
import questionPageComponent from '../Components/questionPageComponent';
import {} from '../Actions/usrActions';
import {} from '../Actions/databaseActions';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch)=> {
    return {

    }
}


const QuestionPage = connect(mapStateToProps, mapDispatchToProps)(questionPageComponent)
export default QuestionPage;