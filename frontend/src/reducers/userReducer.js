
import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser() {
      return null;
    },
  },
});

/**
 * Checks for user in local storage and sets it in the Redux store
 */
export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(userSlice.actions.setUser(user));
    }
  };
};

export const resetUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken(null);
    dispatch(userSlice.actions.removeUser());
  };
};

export const saveUser = (user) => {
  return async dispatch => {
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(userSlice.actions.setUser(user));
  };
};

export default userSlice.reducer;
