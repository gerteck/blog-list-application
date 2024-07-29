import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Row, Col } from 'react-bootstrap';

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
import Signup from './components/Signup';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
    console.log('App Initialize users, Blogs');
  }, [dispatch]);

  if (user === null) {
    if (location.pathname === '/signup') {
      return <Signup />;
    }
    if (location.pathname === '/login') {
      return <Login />;
    }
    // Redirect to login if the URL is not /login or /signup
    return <Navigate to="/login" />;
  }

  const navigationBar = () => (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Blog App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/blogs">
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {user && (
        <Row className="align-items-center mb-3">
          <Col>
            <div>Logged In: {user.name}</div>
          </Col>
          <Col className="text-end">
            <Button
              variant="outline-danger"
              onClick={() => dispatch(resetUser())}
            >
              Logout
            </Button>
          </Col>
        </Row>
      )}
    </>
  );

  const mainPage = (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>Create New</h2>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <div className="mt-4">
        <h2>Blogs Wall</h2>
        <BlogsList />
      </div>
    </>
  );

  return (
    <Container>
      {navigationBar()}
      <Notification />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={mainPage} />
        <Route path="/blogs" element={mainPage} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </Container>
  );
};

export default App;
