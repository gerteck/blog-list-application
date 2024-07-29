import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './css/blog.css';

import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const blogId = useParams().id;
  const blog = blogs.find((blog) => blog.id === blogId);
  const currentUser = useSelector((state) => state.user);

  if (!blog || !currentUser) {
    return <div>loading...</div>;
  }

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

  return (
    <div className="blog-container">
      <h2 className="blog-title">{blog.title}</h2>
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
    </div>
  );
};

export default Blog;
