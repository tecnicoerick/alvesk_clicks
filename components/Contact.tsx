
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <span className="text-neutral-400 tracking-[0.2em] text-sm font-bold uppercase">Vamos Conversar</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-3 mb-8">Agende sua Sessão</h2>
            <p className="text-neutral-500 mb-10 leading-relaxed">
              Cada projeto é único. Estou disponível para discutir como podemos transformar sua visão em realidade através do contraste e da luz.
              Entre em contato pelo formulário ou acompanhe meu trabalho no Instagram.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center group">
                <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center rounded-full group-hover:bg-white transition-colors duration-300">
                  <Phone className="w-5 h-5 text-white group-hover:text-black" />
                </div>
                <div className="ml-4">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">Telefone</p>
                  <p className="text-lg font-medium">+55 21 97115-8253</p>
                </div>
              </div>
              
              <div className="flex items-center group">
                <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center rounded-full group-hover:bg-white transition-colors duration-300">
                  <Mail className="w-5 h-5 text-white group-hover:text-black" />
                </div>
                <div className="ml-4">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">Email</p>
                  <p className="text-lg font-medium">contato@alveskclicks.com.br</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center rounded-full group-hover:bg-white transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-white group-hover:text-black" />
                </div>
                <div className="ml-4">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">Atendimento</p>
                  <p className="text-lg font-medium">Queimados - RJ</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex space-x-6">
              <a 
                href="https://www.instagram.com/alvesk_clicks/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-3 text-neutral-400 hover:text-white transition-all group"
              >
                <div className="p-3 border border-white/10 rounded-full group-hover:border-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium tracking-widest uppercase">@alvesk_clicks</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-neutral-900 p-8 rounded-sm border border-white/5">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Nome</label>
                  <input type="text" className="w-full bg-black border border-neutral-800 text-white p-3 focus:outline-none focus:border-white transition-colors" placeholder="Seu nome" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Email</label>
                  <input type="email" className="w-full bg-black border border-neutral-800 text-white p-3 focus:outline-none focus:border-white transition-colors" placeholder="Seu email" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Tipo de Trabalho</label>
                <select className="w-full bg-black border border-neutral-800 text-white p-3 focus:outline-none focus:border-white transition-colors appearance-none">
                  <option>Ensaio Pessoal</option>
                  <option>Casamento / Evento</option>
                  <option>Comercial / Moda</option>
                  <option>Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Mensagem</label>
                <textarea rows={4} className="w-full bg-black border border-neutral-800 text-white p-3 focus:outline-none focus:border-white transition-colors" placeholder="Conte-me sobre o seu projeto..."></textarea>
              </div>

              <button type="submit" className="w-full bg-white text-black font-bold py-4 px-8 hover:bg-neutral-200 transition-colors tracking-widest uppercase text-sm">
                Solicitar Orçamento
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
