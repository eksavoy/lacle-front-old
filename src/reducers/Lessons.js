/**
 * Created by romain on 23/04/2017.
 */

import {
  GET_ALL_LESSONS_UNSUCCESS, GET_ALL_LESSONS_SUCCESS, ADD_LESSON_SUCCESS,
  UPDATE_LESSON_SUCCESS
} from '../constants/actions';
import * as INITIAL_STATE from '../initialState/Lessons';

export default function (state = INITIAL_STATE.lessons, action) {
  switch (action.type) {
    case GET_ALL_LESSONS_SUCCESS:
      let lessons = {
        complete: true,
        data: []
      };
      Object.assign(lessons.data, action.lessons);
      return lessons;
    case GET_ALL_LESSONS_UNSUCCESS:
      return INITIAL_STATE.lessons;
    case ADD_LESSON_SUCCESS:
      console.log(state);
      var newState = Object.assign({}, state);
      console.log(newState);
      newState.data.push(action.lesson);
      console.log(newState);
      return newState;
    case UPDATE_LESSON_SUCCESS:
      var newState = Object.assign({}, state);
      var index = newState.data.findIndex((lesson) => {return lesson.id === action.lesson.id});
      newState.data[index] = action.lesson;
      return newState;
    default:
      return state;
  }
}