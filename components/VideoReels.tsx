
import React, { useRef, useState } from 'react';
import { Play, Film, AlertCircle } from 'lucide-react';

interface Reel {
  id: number;
  videoUrl: string;
  title: string;
  category: string;
  poster: string;
}

const reels: Reel[] = [
  {
    id: 1,
    videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
    title: "Eternal Union",
    category: "Wedding",
    poster: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    title: "Urban Soul",
    category: "Lifestyle",
    poster: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Nature's Silence",
    category: "Landscape",
    poster: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800"
  }
];

const VideoCard: React.FC<{ reel: Reel; index: number }> = ({ reel, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleMouseEnter = () => {
    if (videoRef.current && !videoError) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silenciosamente ignora erros de autoplay bloqueado
        });
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && !videoError) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleError = () => {
    console.warn(`Erro ao carregar vídeo: ${reel.title}`);
    setVideoError(true);
    setIsLoading(false);
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <div 
      className={`group relative overflow-hidden rounded-sm bg-neutral-900 aspect-[9/16] cursor-pointer reveal delay-${(index % 3) * 100}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Poster (Always present as fallback) */}
      <img 
        src={reel.poster} 
        alt={reel.title}
        className={`absolute inset-0 w-full h-full object-cover grayscale brightness-[0.3] transition-opacity duration-700 ${!isLoading && !videoError ? 'opacity-0' : 'opacity-100'}`}
      />

      {!videoError ? (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={handleLoadedData}
          onError={handleError}
          poster={reel.poster}
          className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
        >
          <source src={reel.videoUrl} type="video/mp4" onError={handleError} />
          Seu navegador não suporta vídeos.
        </video>
      ) : (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/80 p-6 text-center z-20">
          <AlertCircle className="w-8 h-8 text-neutral-600 mb-2" />
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Visualização indisponível</p>
        </div>
      )}
      
      {/* Overlay Initial */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 group-hover:bg-black/20 transition-all duration-500">
        <div className="p-4 rounded-full border border-white/20 mb-4 group-hover:scale-0 group-hover:opacity-0 transition-all duration-500 bg-black/20 backdrop-blur-sm">
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
      <div className="absolute inset-4 border border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none z-30"></div>
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
            Capturando a fluidez da vida através de pequenos filmes cinematográficos que transcendem a estática.
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
