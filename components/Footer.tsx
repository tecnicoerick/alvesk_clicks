
import React from 'react';
import { Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 py-12 border-t border-white/5 text-center">
      <div className="flex justify-center space-x-6 mb-6">
        <a 
          href="https://www.instagram.com/alvesk_clicks/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-neutral-500 hover:text-white transition-colors flex items-center flex-col gap-2"
        >
          <Instagram className="w-6 h-6" />
          <span className="text-[10px] tracking-[0.2em] uppercase">Siga no Instagram</span>
        </a>
      </div>
      
      <p className="text-neutral-600 text-sm tracking-widest uppercase">
        &copy; {new Date().getFullYear()} Alvesk_Clicks
      </p>
      <div className="w-10 h-px bg-white/10 mx-auto my-4"></div>
      <p className="text-neutral-700 text-xs font-light">
        Fotografia Profissional • Arte • Contraste
      </p>
    </footer>
  );
};

export default Footer;
