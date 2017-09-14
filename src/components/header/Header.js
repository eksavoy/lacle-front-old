/**
 * Created by romain on 23/04/2017.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppBar} from "material-ui";
import Logged from "./Logged";
import Login from "./Login";
import AppVersion from "./AppVersion";
import Date from "./Date";
import moment from 'moment';
import scheduler from 'node-schedule';
import {unsetAuthBasic} from "../../actions/Auth";


class Header extends Component {

    constructor(props) {
        super(props);

        this.checkLoginTime = this.checkLoginTime.bind(this);

        scheduler.scheduleJob('10 * * * *', this.checkLoginTime);

    }

    checkLoginTime() {
        if(this.props.auth.token != "" && this.props.auth.lasAction > moment().add(10, 'minutes')){
            this.props.AuthActions();
        }
    }


    render() {
        var style = {
            // flexWrap: 'wrap',
            backgroundImage: "url(res/images/headerBackground.png)"
        };
        return (
            <div>
                <AppVersion/>
                <AppBar
                    showMenuIconButton={false}
                    title={`${this.props.date.format('LLL')}`}
                    style={style}
                    iconElementRight={this.props.auth.token != "" ? <Logged/> : <Login/> }
                    iconElementLeft={<AppVersion/>}
                >
                </AppBar>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
        AuthActions: bindActionCreators(unsetAuthBasic, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        date: state.currentDate
    }
}
export default connect(mapStateToProps)(Header);