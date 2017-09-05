/**
 * Created by romain on 23/04/2017.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timeline from 'react-calendar-timeline';
import Loadable from 'react-loading-overlay';
import moment from 'moment';

import Lesson from '../popup/Lesson';

import {loadRooms} from '../../actions/Room';
import {changeCurrentDate} from '../../actions/Date';
import {
  load as loadLesson,
  update as updateLesson,
  search as searchLesson
} from '../../actions/Lesson';
import {addNotification} from '../../actions/Notification';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popupLesson: {
        open: false,
        currentRoom: {},
        currentTime: NaN,
        lesson: null,
        roomReplacement: NaN
      },
      items: [],
      groups: [],
      date: undefined
    };

    this.renderData = this.renderData.bind(this);

    this.props.LoadRooms();
  }

  componentWillReceiveProps(nextProps){
    var date = Object.assign({}, nextProps.date);
    if(date != undefined && !this.props.date.startOf('day').isSame(moment(date))){
      this.props.SearchLesson(moment(date).startOf('day').format("YYYY-MM-DD"), moment(date).add(1, 'day').startOf('day').format("YYYY-MM-DD"))
    }
  }

  onBoundsChange(canvasTimeStart, canvasTimeEnd) {
  }


  onCanvasDoubleClick(groupId, time, e) {

    if (this.props.auth.token != '') {
      let newState = this.state.popupLesson;
      Object.assign(newState.currentRoom, groupId);
      newState.currentTime = time;
      newState.open        = true;
      newState.lesson      = null;
      this.setState({
        popupLesson: newState
      });
    } else {
      this.UnauthNotification();
    }
  }

  onItemDoubleClick(itemId, e) {
    if (this.props.auth.token != '') {
      let currentLesson = this.props.lessons.data.find((lesson) => {
        return lesson.id == itemId;
      });
      let newState             = this.state.popupLesson;
      newState.lesson          = currentLesson;
      newState.open            = true;
      this.setState({ popupLesson: newState });
    } else {
      this.UnauthNotification();
    }
  }

  onItemMove(itemId, dragTime, newGroupOrder) {
    if (this.props.auth.token != '') {
      var lesson       = this.props.lessons.data.find((lesson) => {
        return lesson.id == itemId;
      });
      let lessonTime   = moment.utc(moment(lesson.endDate).diff(lesson.startDate));
      lesson.startDate = moment(dragTime).toISOString();
      lesson.endDate   = moment(dragTime).add(lessonTime.get('hour'), 'h').add(lessonTime.get('minute'), 'm').toISOString();
      lesson.room      = {
        id: newGroupOrder + 1,
        number: newGroupOrder + 1
      };
      this.props.UpdateLesson(this.props.auth.token, lesson);
    } else {
      this.UnauthNotification();
    }
  }

  UnauthNotification() {
    this.props.AddNotification('Vous devez être connecté', 'warning');
  }

  closeLessonPopup() {
    let oldState  = this.state.popupLesson;
    oldState.open = false;
    this.setState({ popupLesson: oldState });
  }

  renderLoading() {
    var style = {
      display: 'flex',
      width: '800px',
      height: '800px'
    };
    var timeStart;
    var timeEnd;

    if ((moment(this.props.date).startOf('day')).isSame(moment().startOf('day'))) {
      timeStart = moment().subtract(2, 'h');
      timeEnd   = moment().add(2, 'h');
    } else {
      timeStart = moment(this.props.date).add(-12,'h');
      timeEnd   = moment(this.props.date).add(-8, 'h');
    }
    this.props.SearchLesson(timeStart.startOf('day').format("YYYY-MM-DD"), timeEnd.add(1, 'day').startOf('day').format("YYYY-MM-DD"));
    return(
      <Loadable
        active={true}
        spinner={true}
        text="Chargement des données.."
      >
        <div style={style}></div>
      </Loadable>
    );
  }

  setItemsToState(lessonMap) {
    lessonMap.filter((lesson) => {return lesson.state != 'Delete'}).map((lesson) => {
      this.state.items.push({
        id: lesson.id,
        group: lesson.room.id,
        title: (lesson.note != null || lesson.note != "") ? `[NOTE] ${lesson.student.name} / ${lesson.teacher.name}` : `${lesson.student.name} / ${lesson.teacher.name}`,
        start_time: moment(lesson.startDate).valueOf(),
        end_time: moment(lesson.endDate).valueOf(),
        canMove: this.props.auth.token == '' ? false : true,
        canChangeGroup: this.props.auth.token == '' ? false : true,
        canResize: false,
        className: lesson.state == 'Suspend' ? 'lesson-suspend' : ((lesson.studentState == 'P') && (lesson.professorState == 'P')) ? 'lesson-done' : (lesson.studentState == 'P' || lesson.professorState == 'P') ? 'present' : ''
      });
    });
  }

  renderData() {
    var timeStart = null;
    var timeEnd = null;

    if ((moment(this.props.date).startOf('day')).isSame(moment().startOf('day'))) {
      timeStart = moment().subtract(2, 'h');
      timeEnd   = moment().add(2, 'h');
    } else {
      timeStart = moment(this.props.date).add(8, 'h');
      timeEnd   = moment(this.props.date).add(12, 'h');
    }

    if (this.state.groups.length <= 0) {
      this.props.rooms.data.map((room) => {
        this.state.groups.push({
          id: room.number,
          title: `Salle ${room.number}`
        });
      });
    }

    if (this.state.items.length <= 0) {
      this.setItemsToState(this.props.lessons.data);
    } else {
      this.state.items = [];
      this.setItemsToState(this.props.lessons.data);
    }
    return (
      <div>
        <Timeline groups={this.state.groups}
                  items={this.state.items}
                  defaultTimeStart={timeStart}
                  defaultTimeEnd={timeEnd}
                  onCanvasDoubleClick={this.onCanvasDoubleClick.bind(this)}
                  onBoundsChange={this.onBoundsChange.bind(this)}
                  onItemMove={this.onItemMove.bind(this)}
                  visibleTimeEnd={timeEnd.valueOf()}
                  visibleTimeStart={timeStart.valueOf()}
                  lineHeight={45}
                  itemTouchSendsClick={true}
                  onItemDoubleClick={this.onItemDoubleClick.bind(this)}
                  fixedHeader="fixed"
                  stackItems={false}
        />
        <Lesson room={this.state.popupLesson.currentRoom} time={this.state.popupLesson.currentTime}
                open={this.state.popupLesson.open}
                closeFunc={this.closeLessonPopup.bind(this)}
                lesson={this.state.popupLesson.lesson}/>
      </div>
    );
  }

  render() {
    if (this.props.rooms.complete && this.props.lessons.complete) {
      return this.renderData();
    } else {
      return this.renderLoading();
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    LoadRooms: bindActionCreators(loadRooms, dispatch),
    ChangeDate: bindActionCreators(changeCurrentDate, dispatch),
    LoadLessons: bindActionCreators(loadLesson, dispatch),
    UpdateLesson: bindActionCreators(updateLesson, dispatch),
    AddNotification: bindActionCreators(addNotification, dispatch),
    SearchLesson: bindActionCreators(searchLesson, dispatch)
  };
}
function mapStateToProps(state) {
  return {
    rooms: state.rooms,
    date: state.currentDate,
    lessons: state.lessons,
    auth: state.auth
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Board);