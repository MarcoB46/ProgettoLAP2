import { connect } from 'react-redux';
import ElementDetailComponent from '../Components/elementDetailComponent';
import {joinGroup, leaveGroup} from '../Actions/databaseActions';
import {subscribe, unsubscribe} from '../Actions/usrActions';

const mapStateToProps = (state) => ({
    isLoading: state.databaseReducer.isLoading,
    parameters: state.databaseReducer.parameters,
    uid: state.usrReducer.user.id
})

const mapDispatchToProps =  (dispatch)=> {
    return {
        joinGroup: ()=>{dispatch(joinGroup())},
        leaveGroup:()=>{dispatch(leaveGroup())},
        unsubscribe:(target, param)=>{dispatch(unsubscribe(target, param))},
        subscribe:(target,param) =>{dispatch(subscribe(target,param))}
    }
}

var ElementDetail = connect(mapStateToProps, mapDispatchToProps)(ElementDetailComponent);
export default ElementDetail;
