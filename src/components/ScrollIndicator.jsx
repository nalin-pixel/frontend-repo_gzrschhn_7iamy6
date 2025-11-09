import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollIndicator() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 3000);
    const onScroll = () => setHidden(true);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs text-[#2C5F4D]"
        >
          <span className="mb-2 tracking-wide">Scroll to see psychology in action</span>
          <div className="flex flex-col items-center">
            <div className="h-14 w-px bg-[#2C5F4D]/80" />
            <motion.div
              className="h-2 w-2 rounded-full bg-[#2C5F4D]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
