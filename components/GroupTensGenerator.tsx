
import React, { useState } from 'react';
import { generateRandomUniqueAnimals, generateRandomUniqueTens, getAnimalByNumber } from '../utils/gameLogic';
import { Animal } from '../types';
import { saveBet } from '../services/storageService';

type ComboType = 'DG' | 'TG' | 'DD' | 'TD';

interface GeneratedCombo {
  type: ComboType;
  items: (Animal | { ten: string; animal: Animal })[];
}

export const GroupTensGenerator: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ComboType>('DG');
  const [result, setResult] = useState<GeneratedCombo | null>(null);
  const [saved, setSaved] = useState(false);

  const handleGenerate = () => {
    let items: any[] = [];
    
    switch (selectedType) {
      case 'DG': // Duque de Grupo
        items = generateRandomUniqueAnimals(2);
        break;
      case 'TG': // Terno de Grupo
        items = generateRandomUniqueAnimals(3);
        break;
      case 'DD': // Duque de Dezena
        items = generateRandomUniqueTens(2).map(ten => ({
          ten,
          animal: getAnimalByNumber(ten)
        }));
        break;
      case 'TD': // Terno de Dezena
        items = generateRandomUniqueTens(3).map(ten => ({
          ten,
          animal: getAnimalByNumber(ten)
        }));
        break;
    }

    setResult({ type: selectedType, items });
    setSaved(false);
  };

  const getTitle = (type: ComboType) => {
    switch (type) {
      case 'DG': return 'Duque de Grupo';
      case 'TG': return 'Terno de Grupo';
      case 'DD': return 'Duque de Dezena';
      case 'TD': return 'Terno de Dezena';
    }
  };

  const getDescription = (type: ComboType) => {
    switch (type) {
      case 'DG': return 'Acerte 2 grupos entre os sorteados.';
      case 'TG': return 'Acerte 3 grupos entre os sorteados.';
      case 'DD': return 'Acerte 2 dezenas entre as sorteadas.';
      case 'TD': return 'Acerte 3 dezenas entre as sorteadas.';
    }
  };

  const handleSave = () => {
    if (!result) return;
    
    let numbers: string[] = [];
    let description = '';

    if (result.type === 'DG' || result.type === 'TG') {
        const animals = result.items as Animal[];
        numbers = animals.map(a => a.id.toString().padStart(2, '0'));
        description = `Grupos: ${animals.map(a => a.name).join(', ')}`;
    } else {
        const items = result.items as { ten: string; animal: Animal }[];
        numbers = items.map(i => i.ten);
        description = `Dezenas: ${items.map(i => i.ten).join(', ')}`;
    }

    saveBet({
        category: 'Combinação',
        title: getTitle(result.type),
        description: description,
        numbers: numbers
    });
    setSaved(true);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>🧩</span> Combinados da Sorte
      </h2>

      {/* Selector */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setSelectedType('DG')}
          className={`p-3 rounded-lg border text-sm font-medium transition ${selectedType === 'DG' ? 'bg-lucky-dark text-white border-lucky-dark' : 'bg-gray-50 text-gray-600 hover:bg-emerald-50'}`}
        >
          Duque de Grupo
        </button>
        <button
          onClick={() => setSelectedType('TG')}
          className={`p-3 rounded-lg border text-sm font-medium transition ${selectedType === 'TG' ? 'bg-lucky-dark text-white border-lucky-dark' : 'bg-gray-50 text-gray-600 hover:bg-emerald-50'}`}
        >
          Terno de Grupo
        </button>
        <button
          onClick={() => setSelectedType('DD')}
          className={`p-3 rounded-lg border text-sm font-medium transition ${selectedType === 'DD' ? 'bg-lucky-dark text-white border-lucky-dark' : 'bg-gray-50 text-gray-600 hover:bg-emerald-50'}`}
        >
          Duque de Dezena
        </button>
        <button
          onClick={() => setSelectedType('TD')}
          className={`p-3 rounded-lg border text-sm font-medium transition ${selectedType === 'TD' ? 'bg-lucky-dark text-white border-lucky-dark' : 'bg-gray-50 text-gray-600 hover:bg-emerald-50'}`}
        >
          Terno de Dezena
        </button>
      </div>

      <div className="bg-emerald-50 p-4 rounded-lg mb-6 text-center border border-emerald-100">
        <p className="text-emerald-800 font-bold">{getTitle(selectedType)}</p>
        <p className="text-xs text-emerald-600 mt-1">{getDescription(selectedType)}</p>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleGenerate}
          className="bg-lucky-green hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition active:scale-95 flex items-center gap-2"
        >
          <span>🎲</span> Gerar Combinação
        </button>
      </div>

      {result && (
        <div className="animate-fade-in-up">
           <div className="grid grid-cols-1 gap-3 mb-6">
              {result.items.map((item: any, idx) => {
                const isGroup = result.type === 'DG' || result.type === 'TG';
                
                if (isGroup) {
                  const animal = item as Animal;
                  return (
                    <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-xl">
                           🐾
                         </div>
                         <div className="font-bold text-gray-800">{animal.name}</div>
                       </div>
                       <div className="text-right">
                         <div className="text-xs text-gray-500 uppercase font-bold">Grupo</div>
                         <div className="text-2xl font-mono font-bold text-lucky-green">{animal.id.toString().padStart(2, '0')}</div>
                       </div>
                    </div>
                  );
                } else {
                   const { ten, animal } = item;
                   return (
                    <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-lucky-gold/20 rounded-full flex items-center justify-center text-xl">
                           🎱
                         </div>
                         <div>
                            <div className="text-xs text-gray-500">Bicho Ref.</div>
                            <div className="font-bold text-gray-800 text-sm">{animal.name}</div>
                         </div>
                       </div>
                       <div className="text-right">
                         <div className="text-xs text-gray-500 uppercase font-bold">Dezena</div>
                         <div className="text-2xl font-mono font-bold text-lucky-green">{ten}</div>
                       </div>
                    </div>
                   );
                }
              })}
           </div>

           <div className="flex justify-center">
             <button
                onClick={handleSave}
                disabled={saved}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition ${saved ? 'bg-gray-100 text-gray-400 cursor-default' : 'bg-white border-2 border-lucky-green text-lucky-green hover:bg-emerald-50'}`}
             >
                {saved ? '✅ Salvo' : '💾 Salvar Combinação'}
             </button>
           </div>
        </div>
      )}
    </div>
  );
};
