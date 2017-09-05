/**
 * Created by romain on 23/04/2017.
 */

import {GET_ALL_STUDENTS_UNSUCCESS, GET_ALL_STUDENTS_SUCCESS} from '../constants/actions';
import * as INITIAL_STATE from '../initialState/Students';

export default function (state = INITIAL_STATE.students, action) {
    switch (action.type){
        case GET_ALL_STUDENTS_SUCCESS:
            return action.students;
        case GET_ALL_STUDENTS_UNSUCCESS:
            return INITIAL_STATE.students;
        default:
            return state;
    }
}