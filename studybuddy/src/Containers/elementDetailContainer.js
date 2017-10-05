import { connect } from 'react-redux';
import ElementDetailComponent from '../Components/elementDetailComponent';
import {joinGroup, leaveGroup} from '../Actions/databaseActions';

const mapStateToProps = (state) => ({
    isLoading: state.databaseReducer.isLoading,
    parameters: state.databaseReducer.parameters
})

const mapDispatchToProps =  (dispatch)=> {
    return {
        joinGroup: ()=>{dispatch(joinGroup())},
        leaveGroup:()=>{dispatch(leaveGroup())}
    }
}

var ElementDetail = connect(mapStateToProps, mapDispatchToProps)(ElementDetailComponent);
export default ElementDetail;
