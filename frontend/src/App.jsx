import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import blogService from './services/blogs';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    blogService.setToken(null);
  };

  const userDetails = () => (
    <div>
      <p>
        {user.name} logged in! <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );

  if (user === null) {
    return <Login setUser={setUser} />;
  }

  const broadcastSuccessMessage = (message) => {
    dispatch(setNotification(message, 'success', 5));
  };

  const broadcastErrorMessage = (message) => {
    dispatch(setNotification(message, 'error', 5));
  };

  const createBlog = async (event, newBlog) => {
    event.preventDefault();

    if (!newBlog.title || !newBlog.url) {
      broadcastErrorMessage('New blog must have a title, and URL');
      return;
    }

    let returnedBlog = null;

    try {
      returnedBlog = await blogService.create(newBlog);
    } catch (error) {
      const errorMessage =
        'If create new blog or delete does not work, token may have expired. Please login again.';
      dispatch(setNotification(errorMessage, 'error', 5));
      return;
    }

    broadcastSuccessMessage(
      `New blog "${returnedBlog.title}" by ${returnedBlog.author} created`
    );

    if (blogFormRef) {
      blogFormRef.current.toggleVisibility();
    }
    const createdBlog = { ...returnedBlog, user: user };
    setBlogs((prevBlogs) => {
      return prevBlogs.concat(createdBlog);
    });
  };

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    blogService.update(blog.id, updatedBlog);

    setBlogs((prevBlogs) => {
      return prevBlogs.map((prevBlog) => {
        return prevBlog.id === blog.id ? updatedBlog : prevBlog;
      });
    });
  };

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        blogService.remove(blog.id);
        setBlogs((prevBlogs) => {
          return prevBlogs.filter((prevBlog) => prevBlog.id !== blog.id);
        });
      }
    } catch (error) {
      const errorMessage =
        'If create new blog or delete does not work, token may have expired. Please login again.';
      dispatch(setNotification(errorMessage, 'error', 5));
      return;
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {userDetails()}

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm onFormSubmit={createBlog} />
      </Togglable>

      <h2>blogs wall</h2>
      <div data-testid="blogs">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              currentUser={user}
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              setBlogs={setBlogs}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
