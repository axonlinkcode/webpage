import './HomeContent.css'
import BouncingCircles from '../BouncingCircles';

const HomeContent = () => {
    return (
        <div className='home-con'>
            <div className='home-con--para'>
                <p>We drive digital transformation in healthcare by merging cutting-edge technology with human-centric design.</p>
                <p>From accelerating clinical trials to enabling data-driven healthcare solutions, our IT innovations redefine efficiency, accessibility, and patient outcomes.</p>
                <p>Join us in building a smarter, more connected future for healthcare.</p>
            </div>
            <div className='home-con--links'>
                <BouncingCircles />
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
        </div>
    );
};

export default HomeContent;







