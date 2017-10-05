import { connect } from 'react-redux'
import NewGroupComponent from '../Components/newGroupComponent'
import { sendPost } from '../Actions/databaseActions';

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps =  (dispatch)=> {
    return {
        sendPost:(param=>{dispatch(sendPost(param))})
    }
}
const NewGroup = connect(mapStateToProps, mapDispatchToProps)(NewGroupComponent);
export default NewGroup;