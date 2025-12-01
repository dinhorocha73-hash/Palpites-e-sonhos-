
import React, { useState } from 'react';
import { interpretDream } from '../services/geminiService';
import { DreamPrediction } from '../types';
import { ResultCard } from './ResultCard';
import { saveBet } from '../services/storageService';

export const DreamBook: React.FC = () => {
  const [dream, setDream] = useState('');
  const [prediction, setPrediction] = useState<DreamPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleInterpret = async () => {
    if (!dream.trim()) return;
    setLoading(true);
    setPrediction(null);
    setSaved(false);
    try {
      const result = await interpretDream(dream);
      setPrediction(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
      if (!prediction) return;
      saveBet({
          category: 'Sonho',
          title: 'Interpretação de Sonho',
          description: `Sonho: "${dream.substring(0, 50)}${dream.length > 50 ? '...' : ''}" - ${prediction.animal.name}`,
          numbers: [prediction.luckyMilhar]
      });
      setSaved(true);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>🌙</span> Livro dos Sonhos do Mestre Dinho
      </h2>
      
      <p className="text-gray-600 mb-4 text-sm">
        Descreva seu sonho com detalhes. O Mestre Dinho irá consultar os antigos pergaminhos para revelar seu palpite.
      </p>

      <div className="mb-4">
        <textarea
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder="Ex: Sonhei que estava voando sobre uma floresta verde..."
          className="w-full p-4 border-2 border-emerald-100 rounded-lg focus:outline-none focus:border-lucky-green focus:ring-1 focus:ring-lucky-green h-32 resize-none"
        />
      </div>

      <div className="flex justify-end mb-8">
        <button
          onClick={handleInterpret}
          disabled={!dream.trim() || loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 transition-all transform active:scale-95"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Decifrando...</span>
            </>
          ) : (
            <>
              <span>✨</span> Decifrar Sonho
            </>
          )}
        </button>
      </div>

      {prediction && (
        <div className="animate-fade-in space-y-4">
           <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
             <h4 className="text-indigo-900 font-bold text-sm mb-1 uppercase">Interpretação</h4>
             <p className="text-indigo-800 italic">"{prediction.interpretation}"</p>
           </div>
           
           <ResultCard 
             title="Palpite do Sonho"
             number={prediction.luckyMilhar}
             animal={prediction.animal}
             highlight={true}
           />

           <div className="flex justify-center pt-2">
             <button
                onClick={handleSave}
                disabled={saved}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition ${saved ? 'bg-gray-100 text-gray-400 cursor-default' : 'bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'}`}
             >
                {saved ? '✅ Salvo' : '💾 Salvar Interpretação'}
             </button>
           </div>
        </div>
      )}
    </div>
  );
};
