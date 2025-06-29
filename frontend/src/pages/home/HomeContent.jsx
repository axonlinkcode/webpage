import './homeContent.css'
import BouncingCircles from '../../components/BouncingCircles';
import Links from '../../components/links/Links';
import Video from '../../components/videos/Video';

const HomeContent = () => {
    return (
        <div className='home-con'>
            
            <div className='home-con--para'>
                <p>We drive digital transformation in healthcare by merging cutting-edge technology with human-centric design.</p>
                <p>From accelerating clinical trials to enabling data-driven healthcare solutions, our IT innovations redefine efficiency, accessibility, and patient outcomes.</p>
                <p>Join us in building a smarter, more connected future for healthcare.</p>          
            </div>
            <div className='home-content'>
                <BouncingCircles />
                <Video  className='video__mobile'/>
                <Links  className='home__content-link'/>
            </div>
        </div>
    );
};

export default HomeContent;







