
import React, { useState, useRef } from 'react';
import { Upload, Sparkles, RefreshCw, AlertCircle, X } from 'lucide-react';
import { generateImageAnalysis } from '../services/geminiService';
import { AICaptionResponse, AIAnalysisStatus } from '../types';

const AICaptionGenerator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [status, setStatus] = useState<AIAnalysisStatus>(AIAnalysisStatus.IDLE);
  const [result, setResult] = useState<AICaptionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        setStatus(AIAnalysisStatus.IDLE);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setStatus(AIAnalysisStatus.LOADING);
    setError(null);

    try {
      const analysis = await generateImageAnalysis(image);
      setResult(analysis);
      setStatus(AIAnalysisStatus.SUCCESS);
    } catch (e) {
      setStatus(AIAnalysisStatus.ERROR);
      setError("Não foi possível analisar a imagem. Verifique sua chave API ou tente novamente.");
    }
  };

  return (
    <section id="ai-assistant" className="py-24 bg-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
               <Sparkles className="text-gold-400 w-6 h-6" />
               <span className="text-gold-400 font-bold tracking-widest text-sm uppercase">Alvesk AI Lab</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Descubra a História por Trás da Foto
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Utilizamos a inteligência artificial avançada do Gemini para analisar suas fotografias. 
              Faça o upload de uma imagem e receba uma sugestão de legenda poética, 
              uma análise técnica profissional e as melhores hashtags para engajamento.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-neutral-800 p-3 rounded-lg mr-4 border border-white/10">
                  <span className="text-2xl">🎨</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Análise de Composição</h4>
                  <p className="text-neutral-500 text-sm">Entenda as regras dos terços, lines guia e balanço de cores.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-neutral-800 p-3 rounded-lg mr-4 border border-white/10">
                  <span className="text-2xl">✍️</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Copywriting Criativo</h4>
                  <p className="text-neutral-500 text-sm">Legendas emocionantes que conectam com seu público.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Tool */}
          <div className="bg-neutral-950 rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="border-2 border-dashed border-neutral-800 rounded-xl p-8 text-center transition-colors hover:border-gold-500/30 relative overflow-hidden min-h-[300px] flex flex-col items-center justify-center">
              
              {image ? (
                <div className="relative w-full h-full min-h-[250px]">
                  <img src={image} alt="Uploaded" className="w-full h-64 object-contain rounded-lg mb-4" />
                  <button 
                    onClick={() => { setImage(null); setResult(null); }}
                    className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div 
                  className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-10"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-neutral-600 mb-4" />
                  <p className="text-neutral-300 font-medium">Clique para fazer upload</p>
                  <p className="text-neutral-600 text-sm mt-2">JPG ou PNG (Max 5MB)</p>
                </div>
              )}
              
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload}
              />
            </div>

            <div className="mt-6">
              {image && status === AIAnalysisStatus.IDLE && (
                <button 
                  onClick={handleAnalyze}
                  className="w-full bg-gold-500 text-black font-bold py-3 px-6 rounded hover:bg-gold-400 transition-colors flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  ANALISAR COM IA
                </button>
              )}

              {status === AIAnalysisStatus.LOADING && (
                <button disabled className="w-full bg-neutral-800 text-neutral-400 font-bold py-3 px-6 rounded cursor-wait flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Processando...
                </button>
              )}

              {status === AIAnalysisStatus.ERROR && (
                 <div className="bg-red-900/20 border border-red-500/30 p-4 rounded text-red-200 text-sm flex items-center mt-4">
                   <AlertCircle className="w-5 h-5 mr-2" />
                   {error}
                 </div>
              )}

              {result && (
                <div className="mt-6 space-y-4 animate-[fadeIn_0.5s_ease-out]">
                  <div className="bg-neutral-900 p-4 rounded border border-gold-500/20">
                    <h5 className="text-gold-400 text-xs font-bold uppercase mb-2 tracking-widest">Sugestão de Legenda</h5>
                    <p className="text-white italic font-serif leading-relaxed">"{result.caption}"</p>
                  </div>
                  
                  <div className="bg-neutral-900 p-4 rounded border border-white/5">
                    <h5 className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-widest">Análise Técnica</h5>
                    <p className="text-neutral-300 text-sm">{result.technicalAnalysis}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-neutral-800 text-gold-400 px-2 py-1 rounded hover:bg-neutral-700 cursor-default">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICaptionGenerator;
