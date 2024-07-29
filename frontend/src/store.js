// Redux Store for @reduxjs/toolkit package.
// Central place to manage state of application
import { configureStore } from '@reduxjs/toolkit';

import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});

export default store;