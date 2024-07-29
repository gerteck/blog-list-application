import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      return [...state, action.payload];
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

/**
 * Initialize blogs
 * @returns {Function} - Redux Thunk function
 */
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(blogSlice.actions.setBlogs(blogs));
  };
};

/**
 * Create a new blog
 * @param {Object} newBlog - Blog object
 * @returns {Function} - Redux Thunk function
 */
export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.create(newBlog);
    dispatch(blogSlice.actions.createBlog(returnedBlog));
  };
};

/**
 * Like a blog
 * @param {Object} blog - Blog object
 * @returns {Function} - Redux Thunk function
 */
export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const returnedBlog = await blogService.update(blog.id, updatedBlog);
    dispatch(blogSlice.actions.updateBlog(returnedBlog));
  };
};

/**
 * Remove a blog
 * @param {Object} blog - Blog object
 * @returns {Function} - Redux Thunk function
 */
export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(blogSlice.actions.removeBlog(blog.id));
  };
};

/**
 * Add a comment to a blog
 * @param {string} blogId - Blog ID
 * @param {string} comment - Comment text
 * @returns {Function} - Redux Thunk function
 */
export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.addComment(blogId, { text: comment });
    dispatch(blogSlice.actions.updateBlog(returnedBlog));
  };
};

export default blogSlice.reducer;
// export const { setBlogs, createBlog, updateBlog, removeBlog } = blogSlice.actions;
