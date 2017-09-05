/**
 * Created by romain on 23/04/2017.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DatePicker, RaisedButton} from "material-ui";
import {changeCurrentDate} from '../actions/Date';
import moment from 'moment';

class Date extends Component{
    constructor(props){
        super(props);
    }

    handleChange(event, date){
        this.props.ChangeDate(moment(date).startOf('days'));
    }

    resetCurrentDate(event){
        this.props.ChangeDate(moment());
    }

    render(){
        var style = {
            marginBottom: '0.5%'
        };
        return(
            <div>
                <DatePicker
                    hintText="Choisir une date"
                    autoOk={true}
                    defaultDate={this.props.date.toDate()}
                    onChange={this.handleChange.bind(this)}
                />
                <RaisedButton label="Réinitialiser la date" primary={true} style={style} onTouchTap={this.resetCurrentDate.bind(this)}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        date: state.currentDate
    }
}
function mapDispatchToProps(dispatch) {
    return {
        ChangeDate: bindActionCreators(changeCurrentDate, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Date);