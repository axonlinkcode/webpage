import './link.css'
import Button from '../buttons/Button';

const Links = ({ className = '' }) => {
  return (
    <div className={`links ${className}`}>
      <div className='link1'>
        <p>Take our quick survey and share your insights to contribute to the development of solutions that truly meet your needs.</p>
          <Button name='Take survey' link='/forms' className='button'/>
      </div>
      <div className='link2'>
        <p>Join our waiting list to get early access to our upcoming products and features.</p>
          <Button name=' Join waiting list' link='/forms/waitingList'/>
      </div>
    </div>
  );
};

export default Links;
