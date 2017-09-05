/**
 * Created by romain on 23/04/2017.
 */

import Default from "./Default";
import {LESSON_PATH, API_URL} from "../constants/api";
import axios from 'axios';

class Lesson extends Default {
    constructor(){
        super();
        this.path = `${LESSON_PATH}`;
    }

    searchByDate(start, end){
      return axios.get(`${API_URL}/${this.path}/search?start=${start}&end=${end}`)
        .then(res => {return res.data})
        .catch(error => { throw error});
    }
}

export default Lesson;