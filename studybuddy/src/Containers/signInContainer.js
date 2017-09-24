import { connect } from 'react-redux'
import signInComponent from '../Components/signInComponent';
import { checkLogIn, signIn } from '../Actions/usrActions';

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch)=>{
    return{
        checkLogIn:(callback)=>{dispatch(checkLogIn(callback))},
        signIn:(user, callback)=>{dispatch(signIn(user, callback))}
    }
}

const SignIn = connect(mapStateToProps, mapDispatchToProps)(signInComponent);

export default SignIn;
