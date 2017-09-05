/**
 * Created by romain on 22/04/2017.
 */

import {GET_ALL_TEACHERS_SUCCESS, GET_ALL_TEACHERS_UNSUCCESS, ADD_TEACHER_SUCCESS, ADD_TEACHER_UNSUCCESS} from '../constants/actions';
import TeacherApi from '../api/Teacher';
import {API_CALL_WRONG} from '../constants/Errors';
import * as notification from './Notification';
import {RESSOURCE_ADDED} from "../constants/messages";
import * as auth from "./Auth";

const api = new TeacherApi();

function loadSuccess(teachers) {
    return {type: GET_ALL_TEACHERS_SUCCESS, teachers: teachers}
}

function loadUnsuccess() {
    return {type: GET_ALL_TEACHERS_UNSUCCESS}
}

export function load() {
    return function (dispatch) {
        return api.getAll()
            .then(teachers => {dispatch(loadSuccess(teachers))})
            .catch(error => {
                console.log(error);
                dispatch(notification.addNotificationSuccess(API_CALL_WRONG, 'error'));
                dispatch(loadUnsuccess());
            })
    }
}

function addSuccess(teacher) {
    return {type: ADD_TEACHER_SUCCESS, teacher:teacher};
}
function addUnsuccess() {
    return {type: ADD_TEACHER_UNSUCCESS};
}
export function add(authToken, teacher) {
    return function (dispatch) {
        return api.addOne(authToken, teacher)
            .then(res => {
                dispatch(load());
                dispatch(auth.updateLastActionTime());
                dispatch(notification.addNotificationSuccess(RESSOURCE_ADDED, 'success'))
                dispatch(addSuccess(res))
            })
            .catch(error => {
                dispatch(notification.addNotificationSuccess(API_CALL_WRONG, 'error'));
                dispatch(addUnsuccess());
            })
    }
}