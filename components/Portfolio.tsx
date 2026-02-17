
import React, { useState } from 'react';
import { X, ZoomIn, FolderOpen, Image as ImageIcon, ArrowLeft, Calendar, Camera } from 'lucide-react';
import { PhotoItem, Album } from '../types';

interface PortfolioProps {
  photos: PhotoItem[];
  albums: Album[];
}

type PortfolioView = 'gallery' | 'albums';

const categories = [
  { name: 'Casamento', id: 'casamento' },
  { name: 'Pré Wedding', id: 'pre-wedding' },
  { name: 'Infantil', id: 'infantil' },
  { name: 'Externo', id: 'externo' },
  { name: 'Feedback', id: 'feedback' },
  { name: 'Cultos', id: 'cultos' },
];

const HighlightIcon: React.FC<{ label: string; active?: boolean; onClick?: () => void }> = ({ label, active, onClick }) => (
  <div 
    className="flex flex-col items-center space-y-3 cursor-pointer group min-w-[100px]"
    onClick={onClick}
  >
    <div className={`relative w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 ${active ? 'border-neutral-400' : 'border-neutral-800'} group-hover:border-white transition-all duration-300 shadow-xl overflow-hidden`}>
      {/* Vertical Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-neutral-300 z-0"></div>
      
      {/* Camera Icon */}
      <Camera className="w-8 h-8 text-black relative z-10" />
    </div>
    <span className="text-white text-xs font-bold tracking-wider uppercase transition-colors group-hover:text-neutral-400">
      {label}
    </span>
  </div>
);

const Portfolio: React.FC<PortfolioProps> = ({ photos, albums }) => {
  const [activeView, setActiveView] = useState<PortfolioView>('gallery');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setFilter(null);
  };

  const filteredAlbums = filter 
    ? albums.filter(a => a.title.toLowerCase().includes(filter.toLowerCase()) || a.description.toLowerCase().includes(filter.toLowerCase()))
    : albums;

  return (
    <section id="portfolio" className="py-24 bg-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-neutral-500 tracking-[0.2em] text-sm font-bold uppercase">Nossa Arte</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mt-3 mb-12">Portfólio & Eventos</h2>
          
          {/* Highlights Categories Section */}
          <div className="flex overflow-x-auto pb-8 mb-12 scrollbar-hide space-x-6 md:space-x-12 justify-start md:justify-center no-scrollbar">
            {categories.map((cat) => (
              <HighlightIcon 
                key={cat.id} 
                label={cat.name} 
                active={filter === cat.id}
                onClick={() => {
                  setActiveView('albums');
                  setFilter(cat.id === filter ? null : cat.id);
                  setSelectedAlbum(null);
                }}
              />
            ))}
          </div>

          {/* Navigation Tabs */}
          {!selectedAlbum && (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => { setActiveView('gallery'); setFilter(null); }}
                className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest transition-all duration-300 flex items-center border ${
                  activeView === 'gallery' 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/30'
                }`}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                DESTAQUES
              </button>
              <button
                onClick={() => setActiveView('albums')}
                className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest transition-all duration-300 flex items-center border ${
                  activeView === 'albums' 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/30'
                }`}
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                ÁLBUNS
              </button>
            </div>
          )}
        </div>

        {/* Content Area */}
        
        {selectedAlbum ? (
          <div className="animate-[fadeInUp_0.5s_ease-out]">
            <button 
              onClick={handleBackToAlbums}
              className="mb-8 flex items-center text-white/50 hover:text-white transition-colors font-medium tracking-wide uppercase text-xs"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar para Álbuns
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <span className="inline-flex items-center px-3 py-1 bg-white/5 text-white text-[10px] font-bold rounded-full mb-4 border border-white/10 uppercase tracking-widest">
                    <Calendar className="w-3 h-3 mr-2" />
                    {selectedAlbum.date}
                  </span>
                  <h3 className="font-serif text-4xl text-white mb-6 leading-tight uppercase tracking-tighter">{selectedAlbum.title}</h3>
                  <div className="w-12 h-px bg-white/30 mb-6"></div>
                  <p className="text-neutral-400 leading-relaxed text-sm font-light whitespace-pre-line">
                    {selectedAlbum.description}
                  </p>
                  <div className="mt-8 pt-8 border-t border-white/5 flex items-center text-neutral-600 text-[10px] uppercase tracking-widest font-bold">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    <span>{selectedAlbum.photos.length} Fotografias</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedAlbum.photos.map((photo) => (
                  <div 
                    key={photo.id} 
                    className="group relative overflow-hidden cursor-pointer rounded-sm aspect-[3/4]"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img 
                      src={photo.url} 
                      alt={photo.title} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ZoomIn className="text-white w-8 h-8" />
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeView === 'albums' ? (
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fadeIn_0.5s_ease-out]">
            {filteredAlbums.length > 0 ? filteredAlbums.map((album) => (
              <div 
                key={album.id} 
                className="group cursor-pointer bg-neutral-950 rounded-lg overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 shadow-2xl"
                onClick={() => handleAlbumClick(album)}
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={album.coverUrl} 
                    alt={album.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-neutral-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-2 block">{album.date}</span>
                    <h3 className="text-2xl font-serif text-white group-hover:text-neutral-300 transition-colors uppercase tracking-tight">{album.title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed mb-6 font-light">
                    {album.description}
                  </p>
                  <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase border-b border-white/20 pb-1 group-hover:border-white transition-all">
                    Explorar Álbum
                  </span>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-lg">
                <p className="text-neutral-500 uppercase tracking-widest text-sm">Nenhum álbum encontrado nesta categoria.</p>
              </div>
            )}
          </div>

        ) : (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-[fadeIn_0.5s_ease-out]">
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                className="group relative overflow-hidden cursor-pointer rounded-sm"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-800">
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                </div>
                
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                  <p className="text-neutral-500 text-[10px] tracking-[0.3em] font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {photo.category.toUpperCase()}
                  </p>
                  <h3 className="text-white font-serif text-2xl mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 uppercase tracking-tighter">
                    {photo.title}
                  </h3>
                  <button className="text-white border border-white/20 p-4 rounded-full hover:bg-white hover:text-black transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-150">
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[60] bg-black/98 flex items-center justify-center p-4 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
          >
            <X className="w-10 h-10" />
          </button>
          
          <div className="max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row items-stretch bg-neutral-950 rounded-sm overflow-hidden shadow-2xl border border-white/5">
            <div className="w-full md:w-2/3 h-[50vh] md:h-[85vh] bg-black flex items-center justify-center p-4">
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title} 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="w-full md:w-1/3 p-12 flex flex-col justify-center h-auto md:h-[85vh] overflow-y-auto bg-neutral-950">
              <span className="text-neutral-500 tracking-[0.3em] text-[10px] font-bold uppercase mb-4 block">
                {selectedPhoto.category}
              </span>
              <h3 className="text-3xl md:text-5xl font-serif text-white mb-8 uppercase tracking-tighter leading-none">{selectedPhoto.title}</h3>
              
              <div className="w-12 h-px bg-white/20 mb-8"></div>
              
              <p className="text-neutral-400 leading-relaxed text-sm font-light mb-12 italic">
                {selectedPhoto.description || "Uma captura única de um momento inesquecível, onde a luz e o silêncio se encontram para contar uma história."}
              </p>

              <div className="mt-auto pt-8 border-t border-white/5">
                <a 
                  href="#contact"
                  onClick={() => setSelectedPhoto(null)}
                  className="block text-center text-black bg-white py-4 px-8 w-full hover:bg-neutral-200 transition-colors uppercase tracking-[0.2em] font-bold text-[10px]"
                >
                  Solicitar Orçamento
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
