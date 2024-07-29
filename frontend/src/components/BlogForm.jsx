import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';
import './css/blogForm.css'; // Ensure you have this CSS file for styles

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();
  const emptyBlog = {
    title: '',
    url: ''
  };
  const [newBlog, setNewBlog] = useState(emptyBlog);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!newBlog.title || !newBlog.url) {
      dispatch(
        setNotification('New blog must have a title, and URL', 'error', 5)
      );
      return;
    }

    try {
      dispatch(createBlog(newBlog));
      dispatch(
        setNotification(`New blog "${newBlog.title}" created`, 'success', 5)
      );
    } catch (error) {
      dispatch(
        setNotification(
          'Error creating new blog, if token expired, login again',
          'error',
          5
        )
      );
    }

    if (blogFormRef) {
      blogFormRef.current.toggleVisibility();
    }
    setNewBlog(emptyBlog);
  };

  return (
    <>
      <form className="blog-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            className="form-input title-input"
            value={newBlog.title}
            onChange={(e) =>
              setNewBlog((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input
            className="form-input url-input"
            value={newBlog.url}
            onChange={(e) =>
              setNewBlog((prev) => ({ ...prev, url: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <button className="form-button" type="submit">
            Add Blog
          </button>
        </div>
      </form>
    </>
  );
};

export default BlogForm;
