/**
 * Created by romain on 29/04/2017.
 */

import React, {Component} from 'react';
import {FlatButton, TextField} from "material-ui";


class DefaultSelect extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: null
        }
    }

    handleChange(event, value){
        this.setState({value});
    }

    submit(){
        this.props.action(this.props.auth.token, {
            name: this.state.value
        });
        this.props.handleClose();
    }

    render(){
        return (
            <div>
                <TextField hintText="Taper le nom" fullWidth={true} onChange={this.handleChange.bind(this)}/>
                <br/>
                <FlatButton label="Envoyer" onTouchTap={this.submit.bind(this)} primary={true} disabled={this.state.value != null ? false : true}/>
            </div>
        )
    }
}
export default DefaultSelect;