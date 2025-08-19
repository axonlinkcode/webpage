import "./video.css";

const Video = ({ className }) => {
  const videoUrl =
    "https://res.cloudinary.com/dyn5ath7a/video/upload/f_auto,q_auto/v1755601854/axonLogo_vrd96d.mp4";

  return (
    <div className={`hero__content-video ${className}`}>
      <video
        src={videoUrl}
        autoPlay
        muted
        playsInline
        className="video"
        preload="metadata"
        loop
      />
    </div>
  );
};

export default Video;
