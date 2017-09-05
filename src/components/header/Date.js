/**
 * Created by romain on 23/04/2017.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import scheduler from 'node-schedule';
import {changeCurrentDate} from '../../actions/Date';

class Date extends Component{
    constructor(props){
        super(props);

        this.changeDateWithScheduling = this.changeDateWithScheduling.bind(this);

        scheduler.scheduleJob('0 * * * *', this.changeDateWithScheduling);


    }

    changeDateWithScheduling(){
        this.props.ChangeDate(moment());
    }

    render(){
        var style = {
            width: '100%',
            color: 'white',
            textAlign: 'center'
        }
        return(
            <div style={style}>
                <h1>{this.props.date.format('LLL')}</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        date: state.currentDate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ChangeDate: bindActionCreators(changeCurrentDate, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Date)