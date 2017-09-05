/**
 * Created by romain on 29/04/2017.
 */

import React from 'react'
import Default from './Default';
import { Tab, Tabs} from "material-ui";
import CoursesForm from "../forms/CoursesForm";
import StudentsForm from '../forms/StudentsForm';
import TeachersForm from '../forms/TeachersForm';

class Settings extends Default {
    constructor(props) {
        super(props);

        this.content = this.setContent();
    }

    setContent(){
        return(
            <Tabs>
                <Tab label="Ajouter un apprenant">
                    <StudentsForm handleClose={this.handleClose.bind(this)}/>
                </Tab>
                <Tab label="Ajoute un formateur">
                    <TeachersForm handleClose={this.handleClose.bind(this)}/>
                </Tab>
                <Tab label="Ajouter un cours">
                    <CoursesForm handleClose={this.handleClose.bind(this)}/>
                </Tab>
            </Tabs>
        )
    }
}

export default Settings;