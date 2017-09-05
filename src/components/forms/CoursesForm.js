/**
 * Created by romain on 29/04/2017.
 */

import React from 'react';
import DefaultSelect from './DefaultTextField';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {add} from '../../actions/Course';

class CoursesForm extends DefaultSelect {
    constructor(props){
        super(props);
    }

}

function MapStateToProps(state) {
    return {
        auth: state.auth
    }
}
function MapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(add, dispatch)
    }
}
export default connect(MapStateToProps, MapDispatchToProps)(CoursesForm);