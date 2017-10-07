import { connect } from 'react-redux'
import groupsPageComponent from '../Components/groupsPageComponent'
import {} from '../Actions/usrActions';
import {startGroupsFetch, stopGroupsFetch} from '../Actions/databaseActions';

const mapStateToProps = (state) => ({
    groups: state.databaseReducer.groups,
    isLoading: state.databaseReducer.isLoading
})

const mapDispatchToProps = (dispatch)=> {
    return {
        startGroupsFetch:()=>{dispatch(startGroupsFetch())},
        stopGroupsFetch:()=>{dispatch(stopGroupsFetch())}
    }
}


const GroupPage = connect(mapStateToProps, mapDispatchToProps)(groupsPageComponent)
export default GroupPage;