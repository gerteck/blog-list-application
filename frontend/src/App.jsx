import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogsList from './components/BlogsList';

import { initializeUser, resetUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const userDetails = () => (
    <div>
      <p>
        {user.name} logged in!{' '}
        <button onClick={() => dispatch(resetUser())}>logout</button>
      </p>
    </div>
  );

  if (user === null) {
    return <Login />;
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {userDetails()}

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <h2>blogs wall</h2>
      <BlogsList user={user} />
    </div>
  );
};

export default App;
