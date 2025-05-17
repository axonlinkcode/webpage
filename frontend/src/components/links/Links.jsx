import './Links.css'

const Links = () => {
  return (
    <div className='home-con--links'>
        <div className='home-con--link1'>
                    <p>Take our quick survey and share your insights to contribute to the development of solutions that truly meet your needs.</p>
                    <div>
                        <a href="#">Take survey</a>
                    </div>
                </div>
                <div className='home-con--link2'>
                    <p>Join our waiting list to get early access to our upcoming products and features.</p>
                    <div>
                        <a href="#">Join waiting list</a>
                    </div>
                </div>
    </div>
  );
};

export default Links;