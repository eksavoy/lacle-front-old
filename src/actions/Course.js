/**
 * Created by romain on 22/04/2017.
 */

import {GET_ALL_COURSES_SUCCESS, GET_ALL_COURSES_UNSUCCESS, ADD_COURSE_SUCCESS, ADD_COURSE_UNSUCCESS} from '../constants/actions';
import CourseApi from '../api/Course';
import {API_CALL_WRONG} from '../constants/Errors';
import {RESSOURCE_ADDED} from '../constants/messages';
import * as notification from './Notification';
import * as auth from "./Auth";

const api = new CourseApi();

function loadSuccess(courses) {
    return {type: GET_ALL_COURSES_SUCCESS, courses: courses}
}

function loadUnsuccess() {
    return {type: GET_ALL_COURSES_UNSUCCESS}
}

export function load() {
    return function (dispatch) {
        return api.getAll()
            .then(courses => {dispatch(loadSuccess(courses))})
            .catch(error => {
                console.log(error);
                dispatch(notification.addNotificationSuccess(API_CALL_WRONG, 'error'));
                dispatch(loadUnsuccess());
            })
    }
}

function addSuccess(course) {
    return {type: ADD_COURSE_SUCCESS, course:course};
}
function addUnsuccess() {
    return {type: ADD_COURSE_UNSUCCESS};
}
export function add(authToken, course) {
    return function (dispatch) {
        return api.addOne(authToken, course)
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