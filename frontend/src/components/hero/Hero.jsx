import './Hero.css'
import { useState, useRef } from 'react';
import { assets } from '../../assets/assets';


const Hero = () => {
    const introRef = useRef(null);
    const mainRef = useRef(null);
    const [showMainVideo, setShowMainVideo] = useState(false)

    const handleIntroEnd = () => {
        setShowMainVideo(true);
        mainRef.current?.play();
    };

    return (
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
                        />
                    ) : (
                        <video
                            ref={mainRef}
                            src={assets.meds}
                            muted
                            autoPlay
                            playsInline
                            className="video"
                        />
                    )}
                </div>
            </div>
        </div>
                
    );
};

export default Hero;