import React, { useEffect, useState } from 'react';
import { getDailyAnimalPrediction } from '../services/geminiService';
import { DailyPrediction } from '../types';
import { ResultCard } from './ResultCard';

export const DailyAnimal: React.FC = () => {
  const [prediction, setPrediction] = useState<DailyPrediction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch once on mount
    const fetchDaily = async () => {
      try {
        const result = await getDailyAnimalPrediction();
        setPrediction(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDaily();
  }, []);

  return (
    <div className="bg-gradient-to-br from-lucky-dark to-emerald-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">🦁</div>
      
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 relative z-10">
        <span>📅</span> Bicho do Dia
      </h2>
      <p className="text-emerald-200 text-sm mb-6 relative z-10">
        {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      {loading ? (
        <div className="h-48 flex items-center justify-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lucky-gold"></div>
        </div>
      ) : prediction ? (
        <div className="relative z-10 animate-fade-in">
           <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-6 border border-white/20">
             <p className="italic text-sm text-emerald-100">{prediction.text}</p>
           </div>
           
           <div className="bg-white rounded-xl overflow-hidden text-gray-800">
                <ResultCard 
                    title="Palpite do Dia"
                    number={prediction.luckyNumbers[0]}
                    animal={prediction.animal}
                    highlight={false}
                />
           </div>
        </div>
      ) : (
          <div className="text-center py-10 relative z-10 text-emerald-300">
              Não foi possível carregar o palpite hoje.
          </div>
      )}
    </div>
  );
};
