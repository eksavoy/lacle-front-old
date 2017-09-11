/**
 * Created by romain on 01/05/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {FlatButton, Subheader, TimePicker, TextField} from 'material-ui';
import DefaultSelect from './DefaultSelect';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {load as loadCourse} from '../../actions/Course';
import {load as loadTeacher} from '../../actions/Teacher';
import {load as loadStudent} from '../../actions/Student';
import {add as addLesson, update as updateLesson, deleteLesson as deleteLessons} from '../../actions/Lesson';
import {Col, Container, Row} from 'react-grid-system';
import {students} from "../../initialState/Students";

class AddLesson extends Component {

    constructor(props) {
        super(props);
        this.props.LoadCourses();
        this.props.LoadTeachers();
        this.props.LoadStudents();
        this.state = {
            roomReplacement: NaN,
            lessonsRepetition: NaN,
            lessonOld: {},
            lesson: {
                room: {
                    id: NaN
                },
                student: {
                    id: NaN
                },
                teacher: {
                    id: NaN
                },
                startDate: null,
                endDate: null
            },
            professorState: [{
                id: 2,
                name: 'JP : Justififé professor',
                desc: 'JP'
            },
                {
                    id: 4,
                    name: 'NJP : Non justifié professor',
                    desc: 'NJP'
                }, {
                    id: 0,
                    name: 'P : présent',
                    desc: 'P'
                }],
            studentState: [{
                id: 1,
                name: 'JA : Justifié apprenant',
                desc: 'JA'
            },
                {
                    id: 3,
                    name: 'NJA : Non justifié apprenant',
                    desc: 'NJA'
                }, {
                    id: 0,
                    name: 'P : présent',
                    desc: 'P'
                }],
            lessonState: [{
                id: 0,
                name: 'Suspendu',
                desc: 'Suspend'
            },
                {
                    id: 2,
                    name: 'En cours',
                    desc: 'Starting'
                }]
        };
    }

    componentWillMount() {
        if (this.props.lesson != undefined) {
            this.setState({lesson: this.props.lesson, roomReplacement: this.props.roomReplacement});
        } else {
            let lesson = {
                room: {
                    id: NaN,
                    number: NaN
                },
                student: {
                    id: NaN
                },
                teacher: {
                    id: NaN
                },
                startDate: null,
                endDate: null,
                studentState: NaN,
                professorState: NaN,
                state: NaN,
                note: null
            };
            lesson.room.number = this.props.room.id;
            lesson.room.id = this.props.room.id;
            lesson.startDate = moment(this.props.time).toISOString();
            lesson.endDate = moment(this.props.time).add(1, 'hour').toISOString();
            this.setState({lesson: lesson});

        }
    }

    render() {
        var moreAction = [];
        var state = [];
        if (this.props.lesson != undefined) {
            if (this.state.lesson.state == 0) {

                Object.assign(this.state.lessonOld, this.state.lesson);
            }
            moreAction.push(<FlatButton
                label="Remplacer"
                onTouchTap={this.replace.bind(this)}
                secondary={true}
                key="replace"
            />, <FlatButton
                label="Mettre à jour"
                onTouchTap={this.update.bind(this)}
                secondary={true}
                key="update"
            />,
                <FlatButton label="Supprimer"
                onTouchTap={this.delete.bind(this)}
                secondary={true}
                key="delete"/>);
            state.push([
                    <DefaultSelect useTo="Apprenant status" data={this.state.studentState}
                                   changeFunc={this.onChangeStudentState.bind(this)}
                                   defaultValue={this.state.studentState.find((state) => {
                                       return state.desc == this.state.lesson.studentState;
                                   })}/>,
                    <DefaultSelect useTo="Formateur status" data={this.state.professorState}
                                   changeFunc={this.onChangeProfessorState.bind(this)}
                                   defaultValue={this.state.professorState.find((state) => {
                                       return state.desc == this.state.lesson.professorState;
                                   })}/>,
                    <DefaultSelect useTo="Cours status" data={this.state.lessonState}
                                   changeFunc={this.onChangeLessonState.bind(this)}
                                   defaultValue={this.state.lessonState.find((state) => {
                                       return state.desc == this.state.lesson.state;
                                   })}/>,
                    <TextField defaultValue={this.state.lesson.note || 'Note'}
                               onChange={this.onChangeNote.bind(this)}/>
                ]
            );
        } else {
            moreAction.push(<FlatButton
                label="Envoyer"
                primary={true}
                onTouchTap={this.submit.bind(this)}
                key="send"
            />);
        }
        return (
            <Container>
                <h1>Cours : Salle {this.state.lesson.room.number}
                    pour {moment(this.state.lesson.startDate).format('LL')}</h1>
                <Row>
                    <Col sm={5}>
                        <Subheader>Heure de début</Subheader>
                        <TimePicker
                            defaultTime={moment(this.state.lesson.startDate).toDate()}
                            autoOk={true}
                            format={'24hr'}
                            onChange={this.onStartTimeChange.bind(this)}
                            key="startTime"/>
                        <Subheader>Heure de fin</Subheader>
                        <TimePicker
                            defaultTime={moment(this.state.lesson.endDate).toDate()}
                            autoOk={true}
                            format={'24hr'}
                            onChange={this.onEndTimeChange.bind(this)}
                            key="endTime"/>
                        <DefaultSelect useTo="Cours" data={this.props.courses}
                                       changeFunc={this.onChangeCourse.bind(this)}
                                       defaultValue={this.state.lesson.course}/>
                        <DefaultSelect useTo="Apprenant" data={this.props.students.sort((a, b) => {
                            if (a.name < b.name) {
                                return -1;
                            } else {
                                return 1;
                            }
                        })}
                                       changeFunc={this.onChangeStudent.bind(this)}
                                       defaultValue={this.state.lesson.student}/>
                        <DefaultSelect useTo="Formateur" data={this.props.teachers.sort((a, b) => {
                            if (a.name < b.name) {
                                return -1;
                            } else {
                                return 1;
                            }
                        })}
                                       changeFunc={this.onChangeTeacher.bind(this)}
                                       defaultValue={this.state.lesson.teacher}/>
                        <TextField id="weekRepition" hintText="Entrer le nombre de semaine"
                                   onChange={this.onChangeRepetition.bind(this)}/>
                    </Col>
                    <Col sm={4}>
                        {state}
                    </Col>
                    <Col sm={2}>
                    </Col>
                    <Col sm={2}>
                        {moreAction}
                    </Col>
                </Row>

            </Container>
        );
    }

    submit() {
        if (this.state.lessonsRepetition != NaN) {
            let lessons = [];
            lessons.push(this.state.lesson);
            for (var i = 1; i < this.state.lessonsRepetition; i++) {
                var tmpLesson = {};
                Object.assign(tmpLesson, this.state.lesson);
                tmpLesson.startDate = moment(tmpLesson.startDate).add(i, 'weeks').toISOString();
                tmpLesson.endDate = moment(tmpLesson.endDate).add(i, 'weeks').toISOString();
                lessons.push(tmpLesson);
            }
            lessons.forEach((lesson) => {
                this.props.AddLessons(this.props.auth.token, lesson);
            });

        } else {
            this.props.AddLessons(this.props.auth.token, this.state.lesson);
        }
        this.props.closeFunc();

    }

    update() {
        var lesson = {};
        Object.assign(lesson, this.state.lesson);
        if ((lesson.studentState == 1) || (lesson.studentState == 3) || (lesson.professorState == 2) || (lesson.professorState == 4)) {
            lesson.state = 0;
        }
        if (lesson.note == "Note") {
            lesson.note = null;
        }
        this.props.UpdateLesson(this.props.auth.token, lesson);
        this.props.closeFunc();
    }

    replace() {
        let room = {};
        room = Object.assign({}, this.state.lesson.room);
        this.state.lessonOld.state = 1;
        this.state.lesson.room = room;
        this.state.lesson.id = undefined;
        this.state.lesson.professorState = undefined;
        this.state.lesson.studentState = undefined;
        this.state.lesson.state = undefined;
        this.props.AddLessons(this.props.auth.token, this.state.lesson);
        this.props.UpdateLesson(this.props.auth.token, this.state.lessonOld);
        this.props.closeFunc();
    }
    delete(){
        this.props.DeleteLesson(this.props.auth.token, this.state.lesson);
        this.props.closeFunc();
    }

    onChangeRepetition(event, value) {
        if (!Number.isNaN(Number(value))) {
            this.state.lessonsRepetition = Number(value);
        }
    }

    onChangeCourse(event, index, value) {
        this.state.lesson.course.id = value.id;
        this.state.lesson.course.name = value.name;
    }

    onChangeTeacher(event, index, value) {
        this.state.lesson.teacher.id = value.id;
        this.state.lesson.teacher.name = value.name;
    }

    onChangeStudent(event, index, value) {
        this.state.lesson.student.id = value.id;
        this.state.lesson.student.name = value.name;
    }

    onStartTimeChange(event, date) {
        this.state.lesson.startDate = moment(date).toISOString();
    }

    onEndTimeChange(event, date) {
        this.state.lesson.endDate = moment(date).toISOString();
    }

    onChangeStudentState(event, index, value) {
        var lesson = {};
        Object.assign(lesson, this.state.lesson);
        lesson.studentState = value.id;
        this.setState({lesson: lesson});
    }

    onChangeProfessorState(event, index, value) {
        var lesson = {};
        Object.assign(lesson, this.state.lesson);
        lesson.professorState = value.id;
        this.setState({lesson: lesson});
    }

    onChangeLessonState(event, index, value) {
        var lesson = {};
        Object.assign(lesson, this.state.lesson);
        lesson.state = value.id;
        this.setState({lesson: lesson});
    }

    onChangeNote(event, value) {
        this.state.lesson.note = value;
    }
}

AddLesson.propTypes = {
    room: PropTypes.object.isRequired,
    time: PropTypes.number.isRequired,
    closeFunc: PropTypes.func.isRequired,
    roomRemplecament: PropTypes.number
};

AddLesson.defaultProps = {
    room: {
        id: -1,
        title: 'Test'
    },
    time: moment().valueOf(),
    closeFunc: function () {

    }
};

function mapStateToProps(state) {
    return {
        courses: state.courses,
        students: state.students,
        teachers: state.teachers,
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        LoadCourses: bindActionCreators(loadCourse, dispatch),
        LoadTeachers: bindActionCreators(loadTeacher, dispatch),
        LoadStudents: bindActionCreators(loadStudent, dispatch),
        AddLessons: bindActionCreators(addLesson, dispatch),
        UpdateLesson: bindActionCreators(updateLesson, dispatch),
        DeleteLesson: bindActionCreators(deleteLessons, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLesson);