/**
 * Created by romain on 01/05/2017.
 */

import React from 'react';
import Default from './Default';
import {Tab, Tabs} from "material-ui";

import AddLesson from "../forms/AddLesson";


class Lesson extends Default {
    constructor(props){
        super(props);
    }

    setContent(){
        return (
            <Tabs>
                <Tab label="Ajouter un cours">
                    <AddLesson closeFunc={this.props.closeFunc} room={this.props.room} time={this.props.time} lesson={this.props.lesson} roomReplacement={this.props.roomReplacement} />
                </Tab>
            </Tabs>
        )
    }


}

export default Lesson;