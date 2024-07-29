import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Notification from './Notification';
import { setNotification } from '../reducers/notificationReducer';
import { saveUser } from '../reducers/userReducer';
import loginService from '../services/login';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      dispatch(saveUser(user));
      setUsername('');
      setPassword('');
      navigate('/');
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error', 5));
    }
  };

  return (
    <div>
      <h2>Login to Blogs Page!</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username&nbsp;
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password&nbsp;
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
