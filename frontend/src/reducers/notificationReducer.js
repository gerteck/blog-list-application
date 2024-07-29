import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: '' },
  reducers: {
    putNotification(state, action) {
      console.log('putNotification:', action.payload);
      return action.payload;
    },
    removeNotification() {
      return { message: '', type: '' };
    },
  },
});

export const setNotification = (message, type, time) => {
  return async dispatch => {
    dispatch(putNotification({ message, type }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export const { putNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
