import './video.css'
import { useState, useRef } from 'react';
import { assets } from '../../assets/assets'

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
                                src={assets.links}
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
                                src={assets.meds}
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
