/**
 * Created by romain on 21/04/2017.
 */

import {API_URL} from '../constants/api';
import axios from 'axios';

class Auth {
    static check(authToken){
        var config = {
            headers: {
                'Authorization': `Basic ${authToken}`
            }
        };
        return axios.get(`${API_URL}/checkLogin`, config)
            .then(res => {return res.data})
            .catch(error => { throw error});
    }
}

export default Auth;
