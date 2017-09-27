import { connect } from 'react-redux'
import loginComponent from '../Components/loginComponent';
import {attemptLogIn, checkLogIn} from '../Actions/usrActions';

const mapStateToProps = (state) => ({
    

})

const mapDispatchToProps = (dispatch)=>{
    return{
        attemptLogIn:(user,callback)=>{dispatch(attemptLogIn(user, callback))},
        checkLogIn:(callback)=>{dispatch(checkLogIn(callback))},
    }
}

const LogIn = connect(mapStateToProps, mapDispatchToProps)(loginComponent);

export default LogIn;
