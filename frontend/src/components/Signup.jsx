import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import Notification from './Notification';
import { setNotification } from '../reducers/notificationReducer';
import userService from '../services/users'; // Adjust the import path as needed

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await userService.createUser({
        username,
        name,
        password
      });
      setUsername('');
      setName('');
      setPassword('');
      dispatch(
        setNotification('Signup successful. Please log in.', 'success', 5)
      );
      navigate('/login'); // Redirect to login page
    } catch (exception) {
      dispatch(
        setNotification(
          `Signup failed. ${exception.response.data.error}. Please try again.`,
          'error',
          5
        )
      );
    }
  };

  return (
    <Container className="mt-4">
      <h2>Sign Up for Blogs Page!</h2>
      <Notification />
      <Form onSubmit={handleSignup} className="mt-4">
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

        <Form.Group as={Row} className="mb-3" controlId="formBasicName">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={({ target }) => setName(target.value)}
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
          Sign Up
        </Button>
      </Form>

      <div className="mt-3">
        <Button variant="link" onClick={() => navigate('/login')}>
          Already have an account? Log in
        </Button>
      </div>
    </Container>
  );
};

export default Signup;
