import './Hero.css'
import { useState, useRef } from 'react';
import { assets } from '../../assets/assets';
import HomeContent from '../homeContent/HomeContent';


const Hero = () => {
    const introRef = useRef(null);
    const mainRef = useRef(null);
    const [showMainVideo, setShowMainVideo] = useState(false)

    const handleIntroEnd = () => {
        setShowMainVideo(true);
        mainRef.current?.play();
    };

    return (
        <div id="home">
            <div className='hero'>
                <div className='hero__content'>
                    <div className='hero__content-header'>
                        <h1>Transforming Patient care through technological <span>innovation</span></h1>
                    </div>
                    <div className='hero__content-video'>
                        {!showMainVideo ? (
                            <video
                                ref={introRef}
                                src={assets.links}
                                autoPlay
                                muted
                                playsInline
                                onEnded={handleIntroEnd}
                                className="video"
                                preload="metadata"
                                poster={assets.placeholder}
                            />
                        ) : (
                            <video
                                ref={mainRef}
                                src={assets.meds}
                                muted
                                autoPlay
                                playsInline
                                className="video"
                                preload="metadata"
                                poster={assets.placeholder}
                            />
                        )}
                    </div>
                </div>
            </div>
            <HomeContent />
        </div>

    );
};

export default Hero;