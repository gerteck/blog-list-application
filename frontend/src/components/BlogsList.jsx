import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Blog from './Blog';
import { initializeBlogs } from '../reducers/blogReducer';

const BlogsList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  console.log('blogs:', blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div data-testid="blogs">
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog currentUser={user} key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogsList;
