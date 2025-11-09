import { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

// Simple WebGL-like animated gradient using canvas for performance
function GradientMesh() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);

    const handleResize = () => {
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
    };
    const green = [44, 95, 77];
    const charcoal = [26, 26, 26];

    let t = 0;
    const draw = () => {
      t += 0.002; // very slow morph ~45s cycle approximated
      const cx = w / 2 + Math.sin(t) * (w * 0.1);
      const cy = h / 2 + Math.cos(t * 0.8) * (h * 0.1);

      const grad = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.1, w / 2, h / 2, Math.max(w, h) * 0.8);
      grad.addColorStop(0, `rgba(${green[0]}, ${green[1]}, ${green[2]}, 0.25)`);
      grad.addColorStop(1, `rgba(${charcoal[0]}, ${charcoal[1]}, ${charcoal[2]}, 1)`);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // subtle grain overlay
      const grainAlpha = 0.05;
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const a = Math.random() * grainAlpha;
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fillRect(x, y, 1, 1);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onResize = () => handleResize();
    window.addEventListener('resize', onResize);
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0">
      {/* Spline 3D scene covering full hero */}
      <div className="absolute inset-0">
        <Spline style={{ width: '100%', height: '100%' }} scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" />
      </div>
      {/* Organic gradient mesh underneath with grain */}
      <div className="absolute inset-0 opacity-80 mix-blend-plus-lighter pointer-events-none">
        <GradientMesh />
      </div>
    </div>
  );
}
