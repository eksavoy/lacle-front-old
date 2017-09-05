/**
 * Created by romain on 23/04/2017.
 */

import Default from "./Default";
import {COURSE_PATH} from "../constants/api";

class Course extends Default {
    constructor(){
        super()
        this.path = `${COURSE_PATH}`;
    }
}

export default Course;