import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './css/blog.css';

import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, currentUser }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const isAuthor = currentUser.username === blog.user.username;

  const handleDelete = async () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        dispatch(removeBlog(blog));
      }
    } catch (error) {
      const errorMessage =
        'If create new blog or delete does not work, token may have expired. Please login again.';
      dispatch(setNotification(errorMessage, 'error', 5));
      return;
    }
  };

  const blogDetails = () => (
    <div>
      <p className="blog-author">by {blog.author}</p>
      Read at{' '}
      <a
        className="blog-url"
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {blog.url}
      </a>
      <p className="blog-likes">
        Likes: {blog.likes} &nbsp;
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </p>
      {isAuthor && <button onClick={handleDelete}>delete</button>}
    </div>
  );

  return (
    <div className="blog-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <h2 className="blog-title">{blog.title}</h2>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>

      {showDetails && blogDetails()}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default Blog;
