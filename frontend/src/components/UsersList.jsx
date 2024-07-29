import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import userService from '../services/users';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await userService.getAll());
    };
    getUsers();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Users</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsersList;
