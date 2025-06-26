import './home.css'
import Video from '../../components/videos/Video';
import HomeContent from './HomeContent';

const Home = () => {
    return (
        <div name="home" id='home'>
            <div className='hero'>
                <div className='hero__content'>
                    <div className='hero__content-header'>
                        <h1>Transforming Patient care through technological <span>innovation</span></h1>
                    </div>
                   <Video className='hero__content-video'/>
                </div>
            </div>
            <HomeContent />
        </div>

    );
};


export default Home
