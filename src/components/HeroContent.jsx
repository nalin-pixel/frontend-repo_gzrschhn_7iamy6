import { useEffect } from 'react';
import { motion } from 'framer-motion';
import DataTicker from './DataTicker';

const lines = [
  'We Engineer',
  'Attention,',
  'Emotion,',
  'Action.',
];

export default function HeroContent() {
  useEffect(() => {
    document.body.style.backgroundColor = '#1A1A1A';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="relative z-10 flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="w-full md:w-[45%]">
          <div aria-label="headline" className="text-[#FAFAFA]">
            {lines.map((t, i) => (
              <motion.h1
                key={t}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.8 }}
                className="font-['Playfair_Display',serif] text-[48px] leading-[1.1] tracking-[-0.02em] md:text-[64px]"
                dangerouslySetInnerHTML={{ __html: t }}
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: lines.length * 0.8 + 1.2, duration: 0.6 }}
            className="mt-6 text-[18px] leading-[1.6] text-[#999999] md:w-[60%]"
          >
            Psychology-driven design for brands that demand measurable results.
          </motion.p>

          <div className="mt-10">
            <DataTicker />
          </div>

          <motion.a
            href="#framework"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: lines.length * 0.8 + 1.6, duration: 0.6 }}
            className="inline-block mt-14 bg-[#2C5F4D] text-white text-[16px] font-medium px-9 py-4 rounded-[4px] shadow-[0_8px_24px_rgba(44,95,77,0.3)] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            Explore The Framework →
          </motion.a>
        </div>
      </div>
    </div>
  );
}
