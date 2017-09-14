import React, {Component} from 'react';
import packageJson from '../../../package.json';


class AppVersion extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>{`version : ${packageJson.version}`}</div>
        )
    }
}

export default (AppVersion);