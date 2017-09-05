/**
 * Created by romain on 22/04/2017.
 */

import Default from './Default';
import {ROOM_PATH} from '../constants/api'

class Room extends Default{
    constructor(){
        super();
        this.path = `${ROOM_PATH}`;
    }

}

export default Room;