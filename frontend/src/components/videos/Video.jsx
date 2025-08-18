import './video.css'
import { useState, useRef } from 'react';
import video from '../../assets/axonLogo.mp4'

const Video = ({className}) => {
     const introRef = useRef(null);
    const mainRef = useRef(null);
    const [showMainVideo, setShowMainVideo] = useState(false)

    const handleIntroEnd = () => {
        setShowMainVideo(true);
        
    };
  return (
   <div className={`hero__content-video ${className}`}>
                         {!showMainVideo ? (
                            <video
                                ref={introRef}
                                src={video}
                                autoPlay
                                muted
                                playsInline
                                onEnded={handleIntroEnd}
                                className="video"
                                preload="metadata"
                            />
                        ) : (
                            <video
                                ref={mainRef}
                                src={video}
                                muted
                                autoPlay
                                playsInline
                                className="video"
                                preload="metadata"
                            />
                        )} 
                    </div>
  )
}

export default Video
