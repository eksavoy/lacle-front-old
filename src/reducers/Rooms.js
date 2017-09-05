/**
 * Created by romain on 23/04/2017.
 */

import {GET_ALL_ROOMS_UNSUCCESS, GET_ALL_ROOMS_SUCCESS} from '../constants/actions';
import * as INITIAL_STATE from '../initialState/Rooms';

export default function (state = INITIAL_STATE.rooms, action) {
    switch (action.type){
        case GET_ALL_ROOMS_SUCCESS:
            let rooms = {
                complete: true,
                data: []
            };
            Object.assign(rooms.data, action.rooms);
            return rooms;
        case GET_ALL_ROOMS_UNSUCCESS:
            return INITIAL_STATE.rooms;
        default:
            return state;
    }
}