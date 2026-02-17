
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';

interface SlideImage {
  url: string;
  title: string;
  location: string;
  date: string;
}

const featuredEvent: SlideImage[] = [
  {
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1920",
    title: "Casamento de Marina & Eduardo",
    location: "Villa Toscana, RJ",
    date: "12 de Outubro, 2023"
  },
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920",
    title: "Ensaio Pré-Wedding: Luz de Outono",
    location: "Parque Nacional, RJ",
    date: "05 de Outubro, 2023"
  },
  {
    url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1920",
    title: "Editorial Fashion: Contrastes",
    location: "Estúdio Alvesk, RJ",
    date: "01 de Outubro, 2023"
  }
];

const EventSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === featuredEvent.length - 1 ? 0 : prev + 1));
    setProgress(0);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredEvent.length - 1 : prev - 1));
    setProgress(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 0.5; // Ajuste de velocidade aqui
      });
    }, 30);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-[80vh] w-full bg-black overflow-hidden reveal">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
      </div>

      {/* Slides */}
      {featuredEvent.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.url}
            alt={slide.title}
            className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
              index === currentIndex ? 'scale-110' : 'scale-100'
            }`}
          />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-24">
            <div className={`transition-all duration-1000 delay-300 transform ${
              index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-white text-black px-4 py-1 text-[10px] font-black tracking-[0.2em] uppercase rounded-full">
                  Evento em Destaque
                </span>
                <span className="text-white/60 text-xs font-medium flex items-center">
                  <Calendar className="w-3 h-3 mr-2" /> {slide.date}
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-4 uppercase tracking-tighter">
                {slide.title}
              </h2>
              <p className="text-neutral-400 text-sm md:text-lg flex items-center tracking-widest uppercase">
                <MapPin className="w-4 h-4 mr-2" /> {slide.location}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-8 md:right-24 z-30 flex items-center space-x-8">
        <div className="flex items-center space-x-4">
          <button 
            onClick={prevSlide}
            className="p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all group"
          >
            <ChevronLeft className="w-6 h-6 group-active:scale-90" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all group"
          >
            <ChevronRight className="w-6 h-6 group-active:scale-90" />
          </button>
        </div>
        
        <div className="text-white font-serif text-xl tracking-tighter">
          <span className="text-2xl">0{currentIndex + 1}</span>
          <span className="text-white/30 mx-2">/</span>
          <span className="text-white/30 text-sm">0{featuredEvent.length}</span>
        </div>
      </div>

      {/* Progress Bar at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-40">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </section>
  );
};

export default EventSlider;
