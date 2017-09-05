/**
 * Created by romain on 01/05/2017.
 */
import React, {Component} from 'react';
import {FlatButton, MenuItem, SelectField} from "material-ui";
import PropTypes from 'prop-types';


class DefaultSelect extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 0
        }
    }

    handleChange(event, index, value){
        this.setState({value: value});
        this.props.changeFunc(event, index, value);
    }

    componentDidMount(){
        if(this.props.defaultValue != undefined){
            this.setState({value: this.props.defaultValue});
            this.props.changeFunc(null, null, this.props.defaultValue);
        }
    }

    render(){
        var items = [];
        this.props.data.map(item => {
            items.push(<MenuItem value={item} key={item.id} primaryText={item.name}/>)
        });
        return (
            <div>
                <SelectField
                    floatingLabelText={this.state.value.name || this.props.useTo}
                    floatingLabelFixed={true}
                    value={this.state.value.name}
                    onChange={this.handleChange.bind(this)}
                    key={this.props.useTo}
                >
                    {items}
                </SelectField>
            </div>
        )
    }
}

DefaultSelect.propTypes = {
    useTo: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    changeFunc: PropTypes.func.isRequired
};

export default DefaultSelect;