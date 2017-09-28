import { connect } from 'react-redux'
import groupPageComponent from '../Components/groupPageComponent'
import {} from '../Actions/usrActions';
import {} from '../Actions/databaseActions';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch)=> {
    return {

    }
}


const GroupPage = connect(mapStateToProps, mapDispatchToProps)(groupPageComponent)
export default GroupPage;