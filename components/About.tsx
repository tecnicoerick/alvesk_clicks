
import React from 'react';
import { Award, Camera, Users, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side with Decorative Element */}
          <div className="relative group reveal">
            <div className="absolute -inset-4 border border-white/10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 hidden md:block"></div>
            <div className="relative aspect-[4/5] overflow-hidden grayscale contrast-125">
              <img 
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=800" 
                alt="Alvesk Clicks Photographer" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="absolute bottom-8 -right-8 bg-white text-black p-8 hidden lg:block">
              <p className="font-serif text-3xl font-bold tracking-tighter">10+</p>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Anos de Lente</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="reveal delay-200">
            <span className="text-neutral-500 tracking-[0.3em] text-sm font-bold uppercase block mb-4">A Lente por trás do Contraste</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
              Eternizando o que <br />
              <span className="italic font-light text-neutral-400 text-3xl md:text-4xl">os olhos apenas veem.</span>
            </h2>
            
            <div className="space-y-6 text-neutral-400 leading-relaxed text-lg font-light">
              <p>
                Olá, eu sou o olhar por trás da <span className="text-white font-medium">Alvesk_Clicks</span>. Minha jornada na fotografia começou com uma curiosidade incessante pela forma como a luz pode transformar o ordinário em extraordinário.
              </p>
              <p>
                Especializado em capturar a essência através do <span className="italic">preto e branco</span> e de contrastes marcantes, acredito que uma fotografia profissional não é apenas um registro técnico, mas uma narrativa visual que preserva a alma de um momento.
              </p>
              <p>
                Seja em um ensaio pessoal íntimo, na grandiosidade de um casamento ou na precisão de um editorial de moda, meu compromisso é com a verdade do instante e a estética atemporal.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/10">
              <div className="flex flex-col space-y-2 reveal delay-300">
                <Camera className="w-6 h-6 text-white mb-2" />
                <h4 className="text-white font-bold text-sm tracking-widest uppercase">Visão Única</h4>
                <p className="text-neutral-500 text-xs uppercase tracking-wider">Composição artística e técnica apurada.</p>
              </div>
              <div className="flex flex-col space-y-2 reveal delay-300">
                <Users className="w-6 h-6 text-white mb-2" />
                <h4 className="text-white font-bold text-sm tracking-widest uppercase">Conexão Humana</h4>
                <p className="text-neutral-500 text-xs uppercase tracking-wider">Sensibilidade para entender cada história.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
