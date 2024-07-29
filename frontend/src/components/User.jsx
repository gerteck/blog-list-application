import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/users';

const User = () => {
  const [user, setUser] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    const getUser = async () => {
      const users = await userService.getAll();
      setUser(users.find((user) => user.id === id));
    };
    getUser();
  }, [id]);

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <>
      <h2>User:</h2>
      <h3>{user.name}</h3>
      <h4>Added blogs:</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
