
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventSlider from './components/EventSlider';
import Portfolio from './components/Portfolio';
import VideoReels from './components/VideoReels';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { PhotoItem, Album } from './types';

// Initial Photos (Highlights)
const initialPhotos: PhotoItem[] = [
  { 
    id: 1, 
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", 
    title: "O Beijo Eterno", 
    category: "Casamento",
    description: "A celebração máxima do amor em uma captura atemporal em preto e branco, marcada pela chuva de confetes e a alegria contagiante do momento."
  },
  { 
    id: 2, 
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800", 
    title: "Luz de Outono", 
    category: "Externo",
    description: "Ensaio realizado durante a golden hour, explorando as texturas e os tons quentes da estação."
  },
  { 
    id: 3, 
    url: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=800", 
    title: "Portrait Urban", 
    category: "Moda",
    description: "O contraste entre a suavidade do olhar e a crueza do concreto urbano."
  }
];

// Mock Albums Data
const initialAlbums: Album[] = [
  {
    id: 101,
    title: "Casamento Juliana & Roberto",
    date: "Setembro 2023",
    coverUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    description: "Uma cerimônia emocionante realizada ao pôr do sol na Villa Toscana. \n\nA luz dourada do fim de tarde proporcionou o cenário perfeito para capturar a conexão genuína entre Juliana e Roberto.",
    photos: [
      { id: 1011, title: "A Preparação", category: "Casamento", url: "https://images.unsplash.com/photo-1519225495045-3b8296c20ee6?auto=format&fit=crop&q=80&w=600" },
      { id: 1012, title: "A Chegada", category: "Casamento", url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800" },
      { id: 1013, title: "O Sim", category: "Casamento", url: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=600" },
    ]
  },
  {
    id: 102,
    title: "Editorial: Urban Soul",
    date: "Agosto 2023",
    coverUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800",
    description: "Um ensaio de moda que explora o contraste entre a elegância da alta costura e a crueza da arquitetura urbana.",
    photos: [
      { id: 1021, title: "Concreto", category: "Moda", url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600" },
      { id: 1022, title: "Movimento", category: "Moda", url: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=600" },
    ]
  }
];

const App: React.FC = () => {
  const [photos] = useState<PhotoItem[]>(initialPhotos);
  const [albums] = useState<Album[]>(initialAlbums);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main>
        <Hero />
        <EventSlider />
        <Portfolio photos={photos} albums={albums} />
        <VideoReels />
        <About />
        <Services />
        <Contact />
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default App;
