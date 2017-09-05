/**
 * Created by romain on 22/04/2017.
 */

import {CHANGE_CURRENT_DATE} from '../constants/actions';

export function changeCurrentDate(date) {
    return function (dispatch) {
        return dispatch(changDateSuccess(date));
    }
}

function changDateSuccess(date) {
    return {
        type: CHANGE_CURRENT_DATE, date: date
    }
}