/**
 * Created by romain on 23/04/2017.
 */

import {ADD_NOTIFICATION} from '../constants/actions';
import INITIAL_STATE from '../initialState/Notification';

export default function (state = INITIAL_STATE, action) {
    switch (action.type){
        case ADD_NOTIFICATION:
            return action.notification;
        default:
            return state;
    }
}