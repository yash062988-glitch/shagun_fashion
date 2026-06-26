import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../pages/Desktop1.module.css';

type CallModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.callModalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.callModalContent}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0, color: 'var(--color-white)' }}>Call Us</h2>
            <p style={{ color: 'var(--color-gray-300)', marginBottom: '12px' }}>Talk directly with our Manager.</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-white)', margin: '12px 0' }}>
              Mr.Sandeep Jain: +91-9818413822
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: 'var(--color-royalblue)',
                border: 'none',
                borderRadius: '4px',
                color: 'var(--color-white)',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CallModal;
