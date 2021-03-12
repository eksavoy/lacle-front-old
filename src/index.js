// import {app, BrowserWindow, autoUpdater} from 'electron';
// import installExtension, {REACT_DEVELOPER_TOOLS} from 'electron-devtools-installer';
// import {enableLiveReload} from 'electron-compile';

// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// let mainWindow;

// const isDevMode = process.execPath.match(/[\\/]electron/);
// const server = 'http://electron-server.poptech-devs.ovh';
// const feed = `${server}/update/${process.platform}/${app.getVersion()}`;

// if (process.platform !== "darwin") {
//     autoUpdater.setFeedURL(feed);

//     setInterval(() => {
//         autoUpdater.checkForUpdates();
//     }, 60000);

//     autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
//         const dialogOpts = {
//             type: 'info',
//             buttons: ['Restart'],
//             title: 'Mise à jour installé veuillez redémarer',
//             message: `La version ${app.getVersion()} est installée`,
//             detail: 'Une mise à jour est installé pour utiliser cette mise à jour vous devez redémarrer l\'application'
//         }

//         dialog.showMessageBox(dialogOpts, (response) => {
//             if (response === 0) autoUpdater.quitAndInstall();
//         })
//     });

//     autoUpdater.on('error', message => {
//         console.error('There was a problem updating the application');
//         console.error(message);
//     })
// }

// if (isDevMode) enableLiveReload({strategy: 'react-hmr'});

// const createWindow = async () => {
//     // Create the browser window.
//     mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600,
//     });

//     mainWindow.maximize();

//     // and load the index.html of the app.
//     mainWindow.loadURL(`file://${__dirname}/index.html`);

//     // Open the DevTools.
//     if (isDevMode) {
//         await installExtension(REACT_DEVELOPER_TOOLS);
//         mainWindow.webContents.openDevTools();
//     }

//     // Emitted when the window is closed.
//     mainWindow.on('closed', () => {
//         // Dereference the window object, usually you would store windows
//         // in an array if your app supports multi windows, this is the time
//         // when you should delete the corresponding element.
//         mainWindow = null;
//     });
// };

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);

// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//     // On OS X it is common for applications and their menu bar
//     // to stay active until the user quits explicitly with Cmd + Q
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

// app.on('activate', () => {
//     // On OS X it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (mainWindow === null) {
//         createWindow();
//     }
// });

// app.commandLine.appendSwitch('--enable-touch-events');

// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and import them here.

import React from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './store';
const App = require('./app').default;

moment.locale('fr');

injectTapEventPlugin();

const store = configureStore();

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('App'),
  );
};

render();
if (module.hot) {
  module.hot.accept(render);
}
