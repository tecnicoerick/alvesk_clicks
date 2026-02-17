
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/5521996553560"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group flex items-center"
      aria-label="Falar no WhatsApp"
    >
      {/* Tooltip */}
      <span className="mr-3 px-4 py-2 bg-white text-black text-xs font-bold tracking-widest uppercase rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none">
        Falar no WhatsApp
      </span>
      
      {/* Button */}
      <div className="relative">
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40"></div>
        
        <div className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-110 group-active:scale-95">
          <MessageCircle className="w-7 h-7 fill-white/20" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
