import { useSelector } from 'react-redux';
import './css/notification.css';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  // console.log('notification:', notification);
  if (notification.message === '') {
    return null;
  }

  if (notification.type === 'error') {
    return <div className="error">{notification.message}</div>;
  } else if (notification.type === 'success') {
    return <div className="success">{notification.message}</div>;
  } else {
    // Unknown notification type
    return null;
  }
};

export default Notification;
