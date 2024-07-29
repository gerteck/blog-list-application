import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

const BlogsList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <ListGroup data-testid="blogs">
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default BlogsList;
