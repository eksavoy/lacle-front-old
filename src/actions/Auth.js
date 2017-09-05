/**
 * Created by romain on 21/04/2017.
 */

import {SET_AUTH, UNSET_AUTH, UPDATE_AUTH} from '../constants/actions';
import {WRONG_AUTH} from '../constants/Errors';
import api from '../api/Auth';
import * as notification from './Notification';


function authSuccess(authToken) {
    return {type: SET_AUTH, auth: authToken}
}
function authUnSuccess() {
    return {type: UNSET_AUTH}
}

function unsetSuccess(){
    return {type: UNSET_AUTH}
}

export function setAuthBasic(login, password) {
    return function (dispatch) {
        var authToken = new Buffer(`${login}:${password}`).toString('base64');
        return api.check(authToken)
            .then(auth => { dispatch(authSuccess(authToken))})
            .catch(error => {
                dispatch(notification.addNotificationSuccess(WRONG_AUTH, 'error'));
                dispatch(authUnSuccess());
            });
    }
}

export function unsetAuthBasic() {
    return function (dispatch) {
        return dispatch(unsetSuccess());
    }
}

function updateSuccess() {
    return { type: UPDATE_AUTH}
}
export function updateLastActionTime() {
    return function (dispatch) {
        return dispatch(updateSuccess())
    }
}
