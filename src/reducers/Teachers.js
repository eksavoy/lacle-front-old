/**
 * Created by romain on 23/04/2017.
 */

import {GET_ALL_TEACHERS_UNSUCCESS, GET_ALL_TEACHERS_SUCCESS} from '../constants/actions';
import * as INITIAL_STATE from '../initialState/Teachers';

export default function (state = INITIAL_STATE.teachers, action) {
    switch (action.type){
        case GET_ALL_TEACHERS_SUCCESS:
            return action.teachers;
        case GET_ALL_TEACHERS_UNSUCCESS:
            return INITIAL_STATE.teachers;
        default:
            return state;
    }
}