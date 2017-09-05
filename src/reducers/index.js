/**
 * Created by romain on 23/04/2017.
 */

import { combineReducers } from 'redux';
import CurrentDate from './Date'
import Course from './Courses';
import Student from './Students';
import Teacher from './Teachers';
import Rooms from './Rooms';
import Auth from './Auth';
import Lessons from './Lessons';
import Notification from './Notification'

const rootReducer = combineReducers({
    rooms: Rooms,
    currentDate: CurrentDate,
    courses: Course,
    students: Student,
    teachers: Teacher,
    auth: Auth,
    lessons: Lessons,
    notification: Notification
});

export default rootReducer;