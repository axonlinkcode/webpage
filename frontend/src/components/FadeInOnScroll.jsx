import { motion } from "framer-motion";

const FadeInOnScroll = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut", delay }}
      viewport={{ once: false, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;
