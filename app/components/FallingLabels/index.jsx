import React from 'react';
import { motion, useMotionValue, useDragControls } from 'framer-motion';
import styles from "./style.module.scss";

const FallingLabels = () => {
  const labels = Array.from({ length: 5 }, (_, index) => index + 1);
  const dragControls = useDragControls();

  
  return (
    <div className={styles.container}>
      {labels.map((label, index) => (
        <motion.div
          key={label}
          drag
          dragControls={dragControls}
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          style={{ x: useMotionValue(0), y: useMotionValue(0) }}
          className={styles.fallingLabel}
        >
          Label {label}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingLabels;
