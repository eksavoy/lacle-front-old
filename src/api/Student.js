/**
 * Created by romain on 23/04/2017.
 */

import Default from "./Default";
import {STUDENT_PATH} from "../constants/api";

class Student extends Default {
    constructor(){
        super()
        this.path = `${STUDENT_PATH}`;
    }
}

export default Student;