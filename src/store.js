/**
 * Created by romain on 23/04/2017.
 */

import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    )
}