import usrReducer from '../Reducers/usrReducer';
import databaseReducer from '../Reducers/databaseReducer';
import {createStore,combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

const loggerMiddleware = createLogger({
    predicate: (getState, action)=> __DEV__
});

const Reducer = combineReducers({
    usrReducer,
    databaseReducer
});

const enhancer = compose(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)

const store = createStore(Reducer, enhancer);

export default store;