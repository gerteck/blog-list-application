import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Link, useParams, useNavigate } from 'react-router-dom';

import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogsList from './components/BlogsList';
import Blog from './components/Blog';

import { initializeUser, resetUser } from './reducers/userReducer';
import { initializeBlogs } from './reducers/blogReducer';
import UsersList from './components/UsersList';
import User from './components/User';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
    console.log('App Initialize users, Blogs');
  }, [dispatch]);

  if (user === null) {
    return <Login />;
  }

  const navigationBar = () => (
    <div>
      <Link to="/blogs">blogs</Link>&nbsp;
      <Link to="/users">users</Link>&nbsp;
      {user.name} logged in!{' '}
      <button onClick={() => dispatch(resetUser())}>logout</button>
      <div>
        <br />
      </div>
    </div>
  );

  const mainPage = (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <h2>blogs wall</h2>
      <BlogsList />
    </>
  );

  return (
    <div>
      {navigationBar()}
      <Notification />
      <Routes>
        <Route path="/" element={mainPage} />
        <Route path="/blogs" element={mainPage} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
