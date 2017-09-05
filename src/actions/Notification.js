/**
 * Created by romain on 23/04/2017.
 */

import {ADD_NOTIFICATION} from '../constants/actions';

export function addNotificationSuccess(message, level) {
    return {type: ADD_NOTIFICATION, notification: {
        message: message,
        level: level,
        autoDismiss: 3
    }}
}
export function addNotification(message, level) {
    return function (dispatch) {
        return dispatch(addNotificationSuccess(message, level))
    }
}