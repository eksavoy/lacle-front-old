/**
 * Created by romain on 23/04/2017.
 */

import Default from "./Default";
import {TEACHER_PATH} from "../constants/api";

class Teacher extends Default {
    constructor(){
        super();
        this.path = `${TEACHER_PATH}`;
    }
}

export default Teacher;