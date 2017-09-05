/**
 * Created by romain on 23/04/2017.
 */

import {GET_ALL_COURSES_UNSUCCESS, GET_ALL_COURSES_SUCCESS} from '../constants/actions';
import * as INITIAL_STATE from '../initialState/Courses';

export default function (state = INITIAL_STATE.courses, action) {
    switch (action.type){
        case GET_ALL_COURSES_SUCCESS:
            return action.courses;
        case GET_ALL_COURSES_UNSUCCESS:
            return INITIAL_STATE.courses;
        default:
            return state;
    }
}