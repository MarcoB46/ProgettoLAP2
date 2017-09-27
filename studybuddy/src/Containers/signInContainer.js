import { connect } from 'react-redux'
import signInComponent from '../Components/signInComponent';
import { signIn } from '../Actions/usrActions';

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch)=>{
    return{

        signIn:(user, callback)=>{dispatch(signIn(user, callback))}
    }
}

const SignIn = connect(mapStateToProps, mapDispatchToProps)(signInComponent);

export default SignIn;
