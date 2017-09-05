/**
 * Created by romain on 22/04/2017.
 */

import {
    GET_ALL_LESSONS_SUCCESS, GET_ALL_LESSONS_UNSUCCESS, ADD_LESSON_SUCCESS, ADD_LESSON_UNSUCCESS,
    UPDATE_LESSON_UNSUCCESS, UPDATE_LESSON_SUCCESS
} from '../constants/actions';
import LessonsApi from '../api/Lesson';
import {API_CALL_WRONG} from '../constants/Errors';
import * as notification from './Notification';
import * as auth from './Auth';
import {RESSOURCE_ADDED} from "../constants/messages";

const api = new LessonsApi();

function loadSuccess(lessons) {
    return {type: GET_ALL_LESSONS_SUCCESS, lessons: lessons}
}

function loadUnsuccess() {
    return {type: GET_ALL_LESSONS_UNSUCCESS}
}

export function load() {
    return function (dispatch) {
        return api.getAll()
            .then(lessons => {dispatch(loadSuccess(lessons))})
            .catch(error => {
                console.log(error);
                dispatch(notification.addNotificationSuccess(API_CALL_WRONG, 'error'));
                dispatch(loadUnsuccess());
            })
    }
}

function addSuccess(lesson) {
    return {type: ADD_LESSON_SUCCESS, lesson:lesson};
}
function addUnsuccess() {
    return {type: ADD_LESSON_UNSUCCESS};
}
export function add(authToken, lesson) {
    return function (dispatch) {
        return api.addOne(authToken, lesson)
            .then(res => {
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

export function search(start, end) {
  return function (dispatch) {
    return api.searchByDate(start, end)
      .then(res=> {
        dispatch(loadSuccess(res))
      })
      .catch(error => {
        dispatch(notification.addNotificationSuccess(API_CALL_WRONG, 'error'));
        dispatch(addUnsuccess());
      })
  }
}

function updateSuccess(res) {
    return {type: UPDATE_LESSON_SUCCESS, lesson: res}
}
function updateUnsuccess() {
    return { type: UPDATE_LESSON_UNSUCCESS}
}
export function update(authToken, lesson){
    return function (dispatch) {
        return api.update(authToken, lesson)
            .then(res => {
                // dispatch(load());
                dispatch(auth.updateLastActionTime());
                dispatch(notification.addNotificationSuccess(RESSOURCE_ADDED, 'success'))
                dispatch(updateSuccess(res))
            })
            .catch(error => {
              console.log(error);
                dispatch(notification.addNotificationSuccess(API_CALL_WRONG, 'error'));
                dispatch(updateUnsuccess());
            })

    }
}