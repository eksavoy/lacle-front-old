/**
 * Created by romain on 23/04/2017.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Default from './Default'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Dialog, FlatButton, TextField} from "material-ui";
import {setAuthBasic} from '../../actions/Auth'

class Auth extends Default {
    constructor(props) {
        super(props);

        this.content = this.setContent();
    }

    setContent(){
        return (
            <div>
                <div>
                    <TextField hintText="Utilisateurs" onChange={this.handleChangeUser.bind(this)}
                               errorText="Le champ est requis"/>
                </div>
                <div>
                    <TextField hintText="Mot de passe" onChange={this.handleChangePassword.bind(this)}
                               errorText="Le champ est requis" type="password"/>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.setState({
            submitDisable: true,
            user: null,
            password: null
        });
        this.actions.push(<FlatButton
            label="Envoyer"
            primary={true}
            disabled={this.state.submitDisable}
            onTouchTap={this.submit.bind(this)}
            keyboardFocused={true}
        />);
    }


    submit() {
        this.props.AuthActions(this.state.user, this.state.password);
        this.handleClose();
    }

    handleChangeUser(event) {
        this.setState({user: event.target.value})
        if (this.state.password != null && this.state.password != "") {
            this.setState({submitDisable: false})
        }
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value})
        if (this.state.user != null && this.state.user != "") {
            this.setState({submitDisable: false})
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        AuthActions: bindActionCreators(setAuthBasic, dispatch)
    }
};
export default connect(null, mapDispatchToProps)(Auth);