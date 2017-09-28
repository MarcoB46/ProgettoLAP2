import { connect } from 'react-redux'
import UserProfileInitComponent from '../Components/userProfileInitComponent'
import {takePhoto, setUserName, setEOI} from '../Actions/usrActions';
import {getCourses, setCourseId} from '../Actions/databaseActions';

const mapStateToProps = (state) => ({
    user:state.usrReducer.user, 
    corsi: state.databaseReducer.corsi
})

const mapDispatchToProps = (dispatch)=> {
    return {
        takePhoto:(param)=>{dispatch(takePhoto(param))},
        getCourses:()=>{dispatch(getCourses())},
        setUserName:(userName)=>{dispatch(setUserName(userName))},
        setCourseId:(CID)=>{dispatch(setCourseId(CID))},
        setEOI:(bool)=>{dispatch(setEOI(bool))}
    }
}


const UserProfileInit = connect(mapStateToProps, mapDispatchToProps)(UserProfileInitComponent)
export default UserProfileInit;