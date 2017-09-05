/**
 * Created by romain on 23/04/2017.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {unsetAuthBasic} from '../../actions/Auth'
import {FlatButton, FontIcon} from "material-ui";
import Settings from '../popup/Settings';
import Login from "./Login";

class Logged extends Component {
    constructor(props){
        super(props);
        this.state = {
            openSettings: false
        }
    }

    logOff(){
        this.props.AuthActions();
    }

    settings(){
        this.setState({openSettings: true});
    }

    closeSettingModal(){
        this.setState({openSettings: false});
    }
    render(){
        return (
            <div>
                <FlatButton icon={<FontIcon className="material-icons">lock_open</FontIcon>} onTouchTap={this.logOff.bind(this)}></FlatButton>
                <FlatButton icon={<FontIcon className="material-icons">settings</FontIcon>} onTouchTap={this.settings.bind(this)}></FlatButton>
                <Settings open={this.state.openSettings} closeFunc={this.closeSettingModal.bind(this)}/>
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
        auth: state.auth
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logged);