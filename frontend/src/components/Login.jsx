import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

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
    <Container className="mt-4">
      <h2>Login to Blogs Page!</h2>
      <Notification />
      <Form onSubmit={handleLogin} className="mt-4">
        <Form.Group as={Row} className="mb-3" controlId="formBasicUsername">
          <Form.Label column sm="2">
            Username
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <div className="mt-3">
        <Link to="/signup">Sign up here</Link>
      </div>
      <div className="mt-4">
        <p className="text-muted">
          Test with this account: <strong>username: test</strong>,{' '}
          <strong>password: test</strong>
        </p>
      </div>
    </Container>
  );
};

export default Login;
