import React from 'react';
import {connect} from 'react-redux';
import Header from './components/header/Header';
import {MuiThemeProvider} from "material-ui";
import Date from './components/Date';
import NotificationSystem from "react-notification-system";
import Board from "./components/content/Board";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            _notificationSystem: null
        }
    }

    componentDidMount() {
        this.setState({_notificationSystem: this.refs.notificationSystem});
    }

    componentWillReceiveProps(nextProps){
        this.state._notificationSystem.addNotification(nextProps.notification);
        this.state._notificationSystem.clearNotifications();
    }

    render() {

        return (
            <MuiThemeProvider>
                <div>
                    <Header></Header>
                    <Date></Date>
                    <Board></Board>
                    <NotificationSystem ref="notificationSystem"/>
                </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        notification: state.notification
    }
}
export default connect(mapStateToProps)(App);