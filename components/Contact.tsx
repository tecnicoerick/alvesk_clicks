
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, CheckCircle2, Loader2, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    workType: 'Ensaio Pessoal',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SENDING');

    // Prepara os dados para o Formspree
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('type', formData.workType);
    data.append('message', formData.message);
    data.append('_subject', `Novo Orçamento: ${formData.workType} - ${formData.name}`);
    data.append('_replyto', formData.email);

    try {
      const response = await fetch('https://formspree.io/f/vjefiel@gmail.com', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', workType: 'Ensaio Pessoal', message: '' });
      } else {
        const result = await response.json();
        console.error('Erro Formspree:', result);
        setStatus('ERROR');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      setStatus('ERROR');
    }
  };

  return (
    <section id="contact" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div className="reveal">
            <span className="text-neutral-400 tracking-[0.2em] text-sm font-bold uppercase">Vamos Conversar</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-3 mb-8 uppercase tracking-tighter">Agende sua <br/><span className="italic font-light text-neutral-500">Sessão</span></h2>
            <p className="text-neutral-500 mb-10 leading-relaxed font-light">
              Cada projeto é único. Estou disponível para discutir como podemos transformar sua visão em realidade através do contraste e da luz.
              Entre em contato pelo formulário ou acompanhe meu trabalho no Instagram.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center group">
                <div className="w-12 h-12 bg-neutral-900 border border-white/5 flex items-center justify-center rounded-full group-hover:bg-white group-hover:border-white transition-all duration-500">
                  <Phone className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </div>
                <div className="ml-4">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Telefone / WhatsApp</p>
                  <p className="text-lg font-medium tracking-tight">+55 21 97115-8253</p>
                </div>
              </div>
              
              <div className="flex items-center group">
                <div className="w-12 h-12 bg-neutral-900 border border-white/5 flex items-center justify-center rounded-full group-hover:bg-white group-hover:border-white transition-all duration-500">
                  <Mail className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </div>
                <div className="ml-4">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Email Direto</p>
                  <p className="text-lg font-medium tracking-tight">vjefiel@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="w-12 h-12 bg-neutral-900 border border-white/5 flex items-center justify-center rounded-full group-hover:bg-white group-hover:border-white transition-all duration-500">
                  <MapPin className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </div>
                <div className="ml-4">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Base</p>
                  <p className="text-lg font-medium tracking-tight">Queimados - RJ</p>
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
                <div className="p-3 border border-white/10 rounded-full group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase">@alvesk_clicks</span>
              </a>
            </div>
          </div>

          {/* Form / Success Message */}
          <div className="bg-neutral-900 p-8 md:p-12 rounded-sm border border-white/5 relative overflow-hidden reveal delay-200">
            {status === 'SUCCESS' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-[fadeIn_0.5s_ease-out]">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-black" />
                </div>
                <h3 className="font-serif text-3xl text-white mb-4 uppercase tracking-tighter">Mensagem Recebida</h3>
                <p className="text-neutral-400 font-light leading-relaxed max-w-xs mx-auto mb-8">
                  Obrigado pelo contato! Em breve entrarei em contato para conversarmos sobre seu projeto.
                </p>
                <button 
                  onClick={() => setStatus('IDLE')}
                  className="text-xs font-bold tracking-[0.3em] uppercase border-b border-white/20 pb-1 hover:border-white transition-all"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-neutral-500">Nome</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#111] border border-neutral-800 text-white p-4 focus:outline-none focus:border-white transition-all rounded-sm placeholder:text-neutral-700" 
                      placeholder="Seu nome completo" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-neutral-500">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#111] border border-neutral-800 text-white p-4 focus:outline-none focus:border-white transition-all rounded-sm placeholder:text-neutral-700" 
                      placeholder="seu@email.com" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-neutral-500">Tipo de Trabalho</label>
                  <div className="relative">
                    <select 
                      name="workType"
                      value={formData.workType}
                      onChange={handleChange}
                      className="w-full bg-[#111] border border-neutral-800 text-white p-4 focus:outline-none focus:border-white transition-all appearance-none rounded-sm cursor-pointer"
                    >
                      <option>Ensaio Pessoal</option>
                      <option>Casamento / Evento</option>
                      <option>Comercial / Moda</option>
                      <option>Outro</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                      <Send className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-neutral-500">Mensagem</label>
                  <textarea 
                    name="message"
                    required
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#111] border border-neutral-800 text-white p-4 focus:outline-none focus:border-white transition-all rounded-sm placeholder:text-neutral-700 resize-none" 
                    placeholder="Conte-me sobre o seu projeto..."
                  ></textarea>
                </div>

                {status === 'ERROR' && (
                  <div className="p-4 bg-red-900/20 border border-red-500/30 rounded">
                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">
                      Ocorreu um erro ao enviar. Por favor, tente novamente ou use o WhatsApp no botão flutuante.
                    </p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'SENDING'}
                  className="w-full bg-white text-black font-black py-5 px-8 hover:bg-neutral-200 transition-all tracking-[0.3em] uppercase text-xs flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {status === 'SENDING' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>Solicitar Orçamento</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
