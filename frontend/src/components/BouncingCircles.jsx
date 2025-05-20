import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,       // delay before children start animating
      staggerChildren: 0.3,     // delay between each dot's animation
    },
  },
};

const dot = {
  hidden: { y: 0 },
  visible: {
    y: [0, -20, 0],              // bounce up then return
    transition: {
      duration: 0.6,             // total bounce time
      ease: "easeInOut",
      repeatType: "reverse",     // go back to original position
    },
  },
};

const BouncingCircles = ({className=''}) => {
  const colors = ["#52489c", "#a5d8ff", "#91c499", "#a6a6a6","#f18f01"];

  return (
    <motion.div
      className={`container ${className}`}
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "30px",
        width:'100%',
        gap: "0.5rem",
      }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {colors.map((color, index) => (
        <motion.span
          key={index}
          className="dot"
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: color,
            borderRadius: "50%",
          }}
          variants={dot}
        />
      ))}
    </motion.div>
  );
};
export default BouncingCircles;