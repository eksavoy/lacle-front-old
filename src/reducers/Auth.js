/**
 * Created by romain on 22/04/2017.
 */

import {SET_AUTH, UNSET_AUTH, UPDATE_AUTH} from '../constants/actions';
import * as INITIAL_STATE from '../initialState/Auth';
import moment from 'moment';

export default function (state = INITIAL_STATE.auth, action) {
    switch (action.type){
        case SET_AUTH:
            var newState = {
                lasAction: moment()
            };
            Object.assign(newState, {
                token: action.auth
            });
            return newState;
        case UNSET_AUTH:
            return INITIAL_STATE.auth;
        case UPDATE_AUTH:
            var newState = {};
            Object.assign(newState, state);
            newState.lasAction = moment();
            return newState;
        default:
            return state;
    }
}