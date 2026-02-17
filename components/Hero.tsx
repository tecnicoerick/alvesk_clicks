
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const TypingText: React.FC<{ 
  text: string; 
  delay?: number; 
  speed?: number; 
  className?: string;
  onComplete?: () => void;
  start?: boolean;
}> = ({ text, delay = 0, speed = 100, className = "", onComplete, start = true }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!start) return;
    
    const timeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, start]);

  useEffect(() => {
    if (!hasStarted) return;

    if (displayedText.length < text.length) {
      const nextChar = text[displayedText.length];
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + nextChar);
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [displayedText, text, speed, hasStarted, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {hasStarted && displayedText.length < text.length && (
        <span className="animate-pulse border-r-2 border-white ml-1"></span>
      )}
    </span>
  );
};

const Hero: React.FC = () => {
  const [step, setStep] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let requestRef: number;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      requestRef = requestAnimationFrame(() => {});
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Smoother Parallax */}
      <div className="absolute inset-0 z-0 bg-black">
        <div 
          className="w-full h-full overflow-hidden will-change-transform"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: 'transform 0.1s linear' // Pequena suavização extra para evitar jitter
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1920" 
            alt="Alvesk Clicks Photographer" 
            className="w-full h-full object-cover animate-ken-burns opacity-50 grayscale" 
            style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.4)' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-neutral-950"></div>
      </div>

      {/* Content */}
      <div 
        className="relative z-10 text-center px-4 max-w-4xl mx-auto will-change-transform"
        style={{ transform: `translateY(-${scrollY * 0.15}px)` }}
      >
        <p className="text-white font-medium tracking-[0.5em] mb-4 min-h-[1.5rem]">
          <TypingText 
            text="ALVESK_CLICKS" 
            speed={80} 
            onComplete={() => setStep(1)} 
          />
        </p>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight min-h-[12rem] md:min-h-[18rem]">
          <TypingText 
            text="A Arte do" 
            speed={100} 
            start={step >= 1} 
            onComplete={() => setStep(2)} 
          />
          <br />
          <TypingText 
            text="Contraste" 
            speed={120} 
            start={step >= 2} 
            className="italic font-light text-neutral-400"
            onComplete={() => setStep(3)}
          />
        </h1>

        <div className={`transition-all duration-1000 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light uppercase tracking-widest">
            Fotografia Profissional | Momentos Eternizados
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <a href="#portfolio" className="text-white/30 hover:text-white transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
