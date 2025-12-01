
import React, { useState } from 'react';
import { HOROSCOPE_SIGNS } from '../constants';
import { getHoroscopePrediction } from '../services/geminiService';
import { DailyPrediction, HoroscopeSign } from '../types';
import { ResultCard } from './ResultCard';
import { saveBet } from '../services/storageService';

export const Horoscope: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<HoroscopeSign | ''>('');
  const [prediction, setPrediction] = useState<DailyPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handlePredict = async () => {
    if (!selectedSign) return;
    setLoading(true);
    setPrediction(null);
    setSaved(false);
    try {
      const result = await getHoroscopePrediction(selectedSign);
      setPrediction(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!prediction || !selectedSign) return;
    saveBet({
        category: 'Horóscopo',
        title: `Palpite para ${selectedSign}`,
        description: prediction.text,
        numbers: prediction.luckyNumbers
    });
    setSaved(true);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>🔮</span> Horóscopo do Bicho
      </h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Escolha seu Signo</label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {HOROSCOPE_SIGNS.map((s) => (
            <button
              key={s.value}
              onClick={() => setSelectedSign(s.value)}
              className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all ${
                selectedSign === s.value
                  ? 'bg-lucky-green text-white border-lucky-green shadow-md scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-lucky-green hover:bg-emerald-50'
              }`}
            >
              <span className="text-2xl mb-1">{s.icon}</span>
              <span className="text-xs font-medium">{s.value}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={handlePredict}
          disabled={!selectedSign || loading}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-full shadow transition"
        >
          {loading ? 'Consultando os Astros...' : 'Ver Palpite do Signo'}
        </button>
      </div>

      {prediction && (
        <div className="animate-fade-in">
           <div className="mb-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
             <p className="text-purple-900 italic text-center">"{prediction.text}"</p>
           </div>
           <ResultCard 
             title={`Milhar de ${selectedSign}`}
             number={prediction.luckyNumbers[0]}
             animal={prediction.animal}
             highlight={true}
           />
           <div className="flex justify-center pt-4">
             <button
                onClick={handleSave}
                disabled={saved}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition ${saved ? 'bg-gray-100 text-gray-400 cursor-default' : 'bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50'}`}
             >
                {saved ? '✅ Salvo' : '💾 Salvar Horóscopo'}
             </button>
           </div>
        </div>
      )}
    </div>
  );
};
