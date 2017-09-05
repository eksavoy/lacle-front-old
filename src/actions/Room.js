/**
 * Created by romain on 22/04/2017.
 */

import {GET_ALL_ROOMS_SUCCESS, GET_ALL_ROOMS_UNSUCCESS} from '../constants/actions'
import RoomApi from '../api/Room';
import {API_CALL_WRONG} from '../constants/Errors';
import * as notification from './Notification';


const api = new RoomApi();

function loadSuccess(rooms) {
    return {type: GET_ALL_ROOMS_SUCCESS, rooms: rooms}
}

function loadUnsuccess() {
    return {type: GET_ALL_ROOMS_UNSUCCESS}
}

export function loadRooms() {
    return function (dispatch) {
        return api.getAll()
            .then(rooms => {dispatch(loadSuccess(rooms))})
            .catch(error => {
                console.log(error);
                dispatch(notification.addNotificationSuccess(API_CALL_WRONG, 'error'));
                dispatch(loadUnsuccess());
            })
    }
}