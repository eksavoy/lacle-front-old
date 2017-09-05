/**
 * Created by romain on 23/04/2017.
 */

import React, {Component} from 'react';
import {FlatButton, FontIcon} from "material-ui";
import Auth from "../popup/Auth";

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            openModal: false
        }
    }

    closeAuthModal(){
        this.setState({openModal: false});
    }

    handleTap(){
        this.setState({openModal: true});
    }
    render(){
        return(
            <div>
                <FlatButton icon={<FontIcon className="material-icons" onTouchTap={this.handleTap.bind(this)}>lock_outline</FontIcon>} />
                <Auth open={this.state.openModal} closeFunc={this.closeAuthModal.bind(this)}></Auth>
            </div>
        )
    }
}
export default (Login);