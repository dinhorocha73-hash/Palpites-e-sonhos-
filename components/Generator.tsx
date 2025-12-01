
import React, { useState } from 'react';
import { generateRandomNumber, getAnimalByNumber } from '../utils/gameLogic';
import { ResultCard } from './ResultCard';
import { saveBet } from '../services/storageService';

export const Generator: React.FC = () => {
  const [history, setHistory] = useState<{ milhar: string; centena: string } | null>(null);
  const [saved, setSaved] = useState(false);

  const handleGenerate = () => {
    const milhar = generateRandomNumber(4);
    const centena = generateRandomNumber(3);
    setHistory({ milhar, centena });
    setSaved(false);
  };

  const handleSave = () => {
    if (!history) return;
    const animalM = getAnimalByNumber(history.milhar);
    const animalC = getAnimalByNumber(history.centena);

    saveBet({
        category: 'Palpite Rápido',
        title: 'Milhar e Centena da Sorte',
        description: `Milhar: ${animalM.name} | Centena: ${animalC.name}`,
        numbers: [history.milhar, history.centena]
    });
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          className="bg-lucky-green hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition active:scale-95 flex items-center gap-2 text-lg"
        >
          <span>🎲</span> Gerar Palpite Rápido
        </button>
      </div>

      {history && (
        <div className="animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <ResultCard 
                title="Milhar da Sorte"
                number={history.milhar}
                animal={getAnimalByNumber(history.milhar)}
                highlight={true}
            />
            <ResultCard 
                title="Centena Seca"
                number={history.centena}
                animal={getAnimalByNumber(history.centena)}
            />
          </div>
          
          <div className="flex justify-center">
             <button
                onClick={handleSave}
                disabled={saved}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition ${saved ? 'bg-gray-100 text-gray-400 cursor-default' : 'bg-white border-2 border-lucky-green text-lucky-green hover:bg-emerald-50'}`}
             >
                {saved ? (
                    <><span>✅</span> Salvo em "Salvos"</>
                ) : (
                    <><span>💾</span> Salvar Palpite</>
                )}
             </button>
          </div>
        </div>
      )}
    </div>
  );
};
