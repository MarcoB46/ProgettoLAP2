import { connect } from 'react-redux'
import courseDetailsComponent from '../Components/courseDetailsComponent'
import {} from '../Actions/usrActions';
import {fetchCourseDetails} from '../Actions/databaseActions';

const mapStateToProps = (state) => ({
    isLoading: state.databaseReducer.isLoading,
    materie:state.databaseReducer.materie, 
    parameters: state.databaseReducer.parameters
})

const mapDispatchToProps = (dispatch)=> {
    return {
        fetchCourseDetails:()=>{dispatch(fetchCourseDetails())}
    }
}


const CourseDetails = connect(mapStateToProps, mapDispatchToProps)(courseDetailsComponent)
export default CourseDetails;