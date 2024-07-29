// Redux Store for @reduxjs/toolkit package.
// Central place to manage state of application

import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

export default store;