import { connect } from 'react-redux'
import UserProfileInitComponent from '../Components/userProfileInitComponent'
import {takePhoto} from '../Actions/usrActions';

const mapStateToProps = (state) => ({
    user:state.usrReducer.user
})

const mapDispatchToProps = (dispatch)=> {
    return {
        takePhoto:(param)=>{dispatch(takePhoto(param))}
    }
}


const UserProfileInit = connect(mapStateToProps, mapDispatchToProps)(UserProfileInitComponent)
export default UserProfileInit;