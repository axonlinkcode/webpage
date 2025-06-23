import './link.css'
import { Link } from 'react-router-dom';

const Links = ({ className = '' }) => {
  return (
    <div className={`home-con--links ${className}`}>
      <div className='home-con--link1'>
        <p>Take our quick survey and share your insights to contribute to the development of solutions that truly meet your needs.</p>
        <div>
          <a href="#">Take survey</a>
        </div>
      </div>
      <div className='home-con--link2'>
        <p>Join our waiting list to get early access to our upcoming products and features.</p>
        <div>
          <Link to="/forms/waitingList">
            Join waiting list
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Links;
