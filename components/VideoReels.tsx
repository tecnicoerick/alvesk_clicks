
import React, { useRef } from 'react';
import { Play, Film } from 'lucide-react';

interface Reel {
  id: number;
  videoUrl: string;
  title: string;
  category: string;
}

const reels: Reel[] = [
  {
    id: 1,
    videoUrl: "https://player.vimeo.com/external/494252666.sd.mp4?s=7a07535560e227a810d7a6e13f416c141d08d98d&profile_id=165&oauth2_token_id=57447761",
    title: "The Wedding Day",
    category: "Cinema"
  },
  {
    id: 2,
    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=231da6ab368a4d49391030ef58248b111d4d38c6&profile_id=165&oauth2_token_id=57447761",
    title: "Urban Soul",
    category: "Lifestyle"
  },
  {
    id: 3,
    videoUrl: "https://player.vimeo.com/external/459389137.sd.mp4?s=9106296720f78e1784918f3a39e3f0533f07a27a&profile_id=165&oauth2_token_id=57447761",
    title: "Nature's Silence",
    category: "Landscape"
  }
];

const VideoCard: React.FC<{ reel: Reel; index: number }> = ({ reel, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className={`group relative overflow-hidden rounded-sm bg-neutral-900 aspect-[9/16] cursor-pointer reveal delay-${(index % 3) * 100}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={reel.videoUrl}
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
      />
      
      {/* Overlay Initial */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 group-hover:bg-black/20 transition-all duration-500">
        <div className="p-4 rounded-full border border-white/20 mb-4 group-hover:scale-0 group-hover:opacity-0 transition-all duration-500">
          <Play className="w-6 h-6 text-white fill-white" />
        </div>
        
        <div className="absolute bottom-8 left-6 right-6 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <span className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase mb-1 block">
            {reel.category}
          </span>
          <h3 className="text-white font-serif text-xl uppercase tracking-tighter">
            {reel.title}
          </h3>
        </div>
      </div>
      
      {/* Decorative Frame */}
      <div className="absolute inset-4 border border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none"></div>
    </div>
  );
};

const VideoReels: React.FC = () => {
  return (
    <section id="videos" className="py-24 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal">
          <div className="max-w-xl">
            <div className="flex items-center space-x-2 mb-4">
              <Film className="w-5 h-5 text-neutral-500" />
              <span className="text-neutral-500 tracking-[0.3em] text-sm font-bold uppercase">Moving Stories</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight uppercase tracking-tighter">
              Momentos em <br />
              <span className="italic font-light text-neutral-400">Movimento</span>
            </h2>
          </div>
          <p className="text-neutral-500 mt-6 md:mt-0 max-w-sm text-sm font-light leading-relaxed uppercase tracking-widest">
            Capturando a fluidez da vida através de pequenos filmes cinematográficos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reels.map((reel, index) => (
            <VideoCard key={reel.id} reel={reel} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoReels;
