/**
 * Created by romain on 22/04/2017.
 */

import {CHANGE_CURRENT_DATE} from '../constants/actions';
import INITIAL_STATE from '../initialState/Date';

export default function (state = INITIAL_STATE, action) {
    switch (action.type){
        case CHANGE_CURRENT_DATE:
            return action.date;
        default:
            return state;
    }
}