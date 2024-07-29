import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogsList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div data-testid="blogs">
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  );
};

export default BlogsList;
