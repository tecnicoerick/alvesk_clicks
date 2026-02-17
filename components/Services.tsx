
import React from 'react';
import { Camera, Heart, Calendar, Check, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "Eventos",
    price: "Sob Consulta",
    icon: <Calendar className="w-8 h-8" />,
    features: [
      "Cobertura fotográfica completa",
      "Eventos corporativos e sociais",
      "Galeria online para convidados",
      "Edição profissional de todas as fotos",
      "Entrega rápida e segura"
    ]
  },
  {
    title: "Casamentos",
    price: "Sob Consulta",
    icon: <Heart className="w-8 h-8" />,
    features: [
      "Cobertura do making of à festa",
      "Segundo fotógrafo incluso",
      "Álbum de luxo personalizado",
      "Pen drive exclusivo com as fotos",
      "Atendimento personalizado pré-evento",
      "Drone (consultar disponibilidade)"
    ]
  },
  {
    title: "pré e pós Wedding",
    price: "Sob Consulta",
    icon: <Sparkles className="w-8 h-8" />,
    features: [
      "Ensaio em locações externas",
      "Direção de poses artística",
      "Looks ilimitados durante o ensaio",
      "Fotos de alta resolução editadas",
      "Ideal para Save the Date ou Trash the Dress"
    ]
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-neutral-950 relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-neutral-600/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-neutral-900/20 rounded-full blur-3xl"></div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-neutral-500 tracking-[0.2em] text-sm font-bold uppercase">Investimento</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mt-3 mb-6">Serviços & Planos</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Pacotes personalizados para atender às suas necessidades, com a qualidade e o olhar artístico que suas memórias merecem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`bg-neutral-900 border p-8 rounded-lg transition-all duration-300 flex flex-col h-full ${
                index === 1 
                ? 'border-white/40 shadow-2xl shadow-white/5 relative' 
                : 'border-white/5 hover:border-white/20'
              }`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] py-1.5 px-6 rounded-full shadow-xl">
                  Destaque
                </div>
              )}
              
              <div className="text-white mb-6 p-3 bg-white/5 rounded-full w-fit self-center">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-serif text-center text-white mb-2 uppercase tracking-wider">{service.title}</h3>
              <div className="text-center mb-8">
                <span className="text-xl font-light text-neutral-400 uppercase tracking-[0.2em]">{service.price}</span>
              </div>

              <div className="w-full h-px bg-white/5 mb-8"></div>

              <ul className="space-y-4 mb-10 flex-grow">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-neutral-400 text-sm">
                    <Check className="w-4 h-4 text-white mr-3 mt-0.5 flex-shrink-0" />
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="#contact"
                className={`w-full py-4 px-6 rounded-sm font-bold tracking-[0.2em] transition-all text-center text-xs uppercase ${
                  index === 1 
                    ? 'bg-white text-black hover:bg-neutral-200 shadow-lg' 
                    : 'bg-transparent border border-white/20 text-white hover:bg-white hover:text-black'
                }`}
              >
                Solicitar Orçamento
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
