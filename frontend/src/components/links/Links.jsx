import './link.css'
import Button from '../buttons/Button';

const Links = ({ className = '' }) => {
  return (
    <div className={`home-con--links ${className}`}>
      <div className='home-con--link1'>
        <p>Take our quick survey and share your insights to contribute to the development of solutions that truly meet your needs.</p>
        <div>
          <Button name='Take survey' />
        </div>
      </div>
      <div className='home-con--link2'>
        <p>Join our waiting list to get early access to our upcoming products and features.</p>
        <div>
          <Button name=' Join waiting list' link='/forms/waitingList' />
        </div>
      </div>
    </div>
  );
};

export default Links;
