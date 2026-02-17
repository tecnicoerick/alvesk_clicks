import React, { useState, useRef } from 'react';
import { Upload, Save, Image as ImageIcon, Trash2 } from 'lucide-react';
import { PhotoItem } from '../types';

interface PortfolioManagerProps {
  onAddPhoto: (photo: PhotoItem) => void;
}

const PortfolioManager: React.FC<PortfolioManagerProps> = ({ onAddPhoto }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview || !title || !category) return;

    const newPhoto: PhotoItem = {
      id: Date.now(), // Simple ID generation
      url: imagePreview,
      title,
      category,
      description
    };

    onAddPhoto(newPhoto);
    
    // Reset form
    setTitle('');
    setCategory('');
    setDescription('');
    setImagePreview(null);
    alert('Foto adicionada ao portfólio com sucesso!');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-white mb-4">Gerenciador de Portfólio</h2>
          <p className="text-neutral-400">Adicione novos eventos e memórias à sua galeria.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-neutral-900 p-8 rounded-sm border border-white/5 shadow-xl">
            <h3 className="text-xl text-gold-400 font-serif mb-6 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Nova Publicação
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Título do Evento</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black border border-neutral-800 text-white p-3 focus:outline-none focus:border-gold-500 transition-colors rounded-sm" 
                  placeholder="Ex: Casamento Ana & João"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Categoria</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black border border-neutral-800 text-white p-3 focus:outline-none focus:border-gold-500 transition-colors rounded-sm"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Casamento">Casamento</option>
                  <option value="Retrato">Retrato</option>
                  <option value="Natureza">Natureza</option>
                  <option value="Urbano">Urbano</option>
                  <option value="Moda">Moda</option>
                  <option value="Eventos">Eventos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Descrição do Evento</label>
                <textarea 
                  rows={4} 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black border border-neutral-800 text-white p-3 focus:outline-none focus:border-gold-500 transition-colors rounded-sm" 
                  placeholder="Descreva os detalhes, a emoção e o local..."
                ></textarea>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Imagem</label>
                <div 
                  className="border-2 border-dashed border-neutral-800 rounded-sm p-6 text-center hover:border-gold-500/50 transition-colors cursor-pointer bg-black/50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="flex items-center justify-center text-gold-400">
                      <ImageIcon className="w-6 h-6 mr-2" />
                      <span>Imagem Selecionada (Clique para alterar)</span>
                    </div>
                  ) : (
                    <div className="text-neutral-500">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-sm">Clique para fazer upload</span>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required={!imagePreview}
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-gold-500 text-black font-bold py-4 px-8 hover:bg-gold-400 transition-colors tracking-widest uppercase text-sm flex items-center justify-center rounded-sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Publicar no Portfólio
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div>
             <h3 className="text-xl text-white font-serif mb-6">Pré-visualização</h3>
             <div className="bg-black p-4 rounded-sm border border-white/10">
                <div className="aspect-[3/4] w-full bg-neutral-900 flex items-center justify-center overflow-hidden relative group rounded-sm mb-4">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-neutral-700 flex flex-col items-center">
                        <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                        <span>A imagem aparecerá aqui</span>
                    </div>
                  )}
                  
                  {/* Mock Overlay similar to Portfolio */}
                  {imagePreview && (
                     <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6">
                        <p className="text-gold-400 text-sm tracking-widest mb-2">{category.toUpperCase() || 'CATEGORIA'}</p>
                        <h3 className="text-white font-serif text-2xl mb-4 text-center">{title || 'Título da Foto'}</h3>
                     </div>
                  )}
                </div>

                <div className="space-y-3">
                    <div className="h-4 bg-neutral-800 rounded w-3/4">
                        {title && <span className="text-white font-bold">{title}</span>}
                    </div>
                    <div className="h-20 bg-neutral-900 rounded border border-neutral-800 p-3">
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            {description || "A descrição do evento aparecerá aqui..."}
                        </p>
                    </div>
                </div>
             </div>
             
             <div className="mt-8 p-4 bg-gold-500/10 border border-gold-500/20 rounded text-sm text-gold-400">
                 <p>ℹ️ Nota: Como este é um site de demonstração, as fotos adicionadas serão mantidas apenas enquanto você estiver nesta sessão do navegador.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;