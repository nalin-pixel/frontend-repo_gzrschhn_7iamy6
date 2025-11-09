import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroBackground from './components/HeroBackground';
import HeroContent from './components/HeroContent';
import ScrollIndicator from './components/ScrollIndicator';

export default function App() {
  const { scrollYProgress } = useScroll();
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const bgTranslateY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] overflow-x-hidden">
      {/* Background: Spline + gradient mesh */}
      <motion.div style={{ scale: bgScale, y: bgTranslateY }} className="absolute inset-0">
        <HeroBackground />
      </motion.div>

      {/* Foreground content with scroll transforms */}
      <motion.div style={{ scale: headlineScale, opacity: headlineOpacity }}>
        <HeroContent />
      </motion.div>

      <ScrollIndicator />

      {/* spacer to allow scroll effects */}
      <section id="framework" className="relative z-10 min-h-[120vh] bg-gradient-to-b from-transparent to-[#0f0f0f]">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-32">
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-5xl text-[#FAFAFA] mb-6">The Framework</h2>
          <p className="text-[#c9c9c9] md:w-2/3 leading-relaxed">
            Our lab merges cognitive science and aesthetics to systematically engineer attention,
            emotion, and action. Below, experience principle-by-principle interactions that
            demonstrate how micro-perceptions compound into measurable outcomes.
          </p>
        </div>
      </section>
    </div>
  );
}
