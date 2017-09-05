/**
 * Created by romain on 23/04/2017.
 */

import {API_URL} from '../constants/api';
import axios from 'axios';

class Default {
    getAll(){
        return axios.get(`${API_URL}/${this.path}`)
            .then(res => {return res.data})
            .catch(error => { throw error});
    }

    addOne(authToken, object){
        var config = {
            headers: {
                'Authorization': `Basic ${authToken}`
            }
        };
        return axios.post(`${API_URL}/${this.path}`, object, config)
            .then(res => { return res.data})
            .catch(error => { throw error})
    }

    update(authToken, object){
        var config = {
            headers: {
                'Authorization': `Basic ${authToken}`
            }
        };
        return axios.put(`${API_URL}/${this.path}/${object.id}`, object, config)
            .then(res => { return res.data})
            .catch(error => { throw error });
    }
}

export default Default;