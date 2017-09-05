/**
 * Created by romain on 22/04/2017.
 */

import {GET_ALL_STUDENTS_SUCCESS, GET_ALL_STUDENTS_UNSUCCESS, ADD_STUDENT_SUCCESS, ADD_STUDENT_UNSUCCESS} from '../constants/actions';
import StudentApi from '../api/Student';
import {API_CALL_WRONG} from '../constants/Errors';
import * as notification from './Notification';
import {RESSOURCE_ADDED} from "../constants/messages";
import * as auth from "./Auth";

const api = new StudentApi();

function loadSuccess(students) {
    return {type: GET_ALL_STUDENTS_SUCCESS, students: students}
}

function loadUnsuccess() {
    return {type: GET_ALL_STUDENTS_UNSUCCESS}
}

export function load() {
    return function (dispatch) {
        return api.getAll()
            .then(students => {dispatch(loadSuccess(students))})
            .catch(error => {
                console.log(error);
                dispatch(notification.addNotificationSuccess(API_CALL_WRONG, 'error'));
                dispatch(loadUnsuccess());
            })
    }
}

function addSuccess(student) {
    return {type: ADD_STUDENT_SUCCESS, student:student};
}
function addUnsuccess() {
    return {type: ADD_STUDENT_UNSUCCESS};
}
export function add(authToken, student) {
    return function (dispatch) {
        return api.addOne(authToken, student)
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