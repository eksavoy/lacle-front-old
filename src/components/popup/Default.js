/**
 * Created by romain on 01/05/2017.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Dialog, FlatButton} from "material-ui";

class Default extends Component{

    constructor(props){
        super(props);

        this.state = {
            open: false
        };

        this.actions = [
            <FlatButton
                label="Annuler"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />
        ]
    }

    handleClose(){
        this.props.closeFunc();
    };

    render() {
        this.content = this.setContent();
        return(
            <Dialog
                open={this.props.open}
                actions={this.actions}
                modal={true}
            >
                {this.content}
            </Dialog>
        )
    }

}

Default.propTypes = {
    open: PropTypes.bool.isRequired,
    closeFunc: PropTypes.func.isRequired
};

export default Default;