
import React, { useEffect, useState } from 'react';
import { SavedBet } from '../types';
import { getSavedBets, deleteBet } from '../services/storageService';

export const SavedBets: React.FC = () => {
  const [bets, setBets] = useState<SavedBet[]>([]);

  useEffect(() => {
    setBets(getSavedBets());
  }, []);

  const handleDelete = (id: string) => {
    const updated = deleteBet(id);
    setBets(updated);
  };

  if (bets.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-emerald-100 text-center">
        <div className="text-4xl mb-4">📂</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Nenhum palpite salvo</h2>
        <p className="text-gray-500 text-sm">
          Gere palpites, interprete sonhos ou consulte o horóscopo e clique em "Salvar" para vê-los aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 px-2">
        <span>📂</span> Meus Palpites Salvos
      </h2>

      {bets.map((bet) => (
        <div key={bet.id} className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-lucky-green relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
             <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    {bet.category}
                </span>
                <span className="text-xs text-gray-400 ml-2">
                    {new Date(bet.timestamp).toLocaleDateString('pt-BR')} às {new Date(bet.timestamp).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                </span>
             </div>
             <button 
                onClick={() => handleDelete(bet.id)}
                className="text-gray-400 hover:text-red-500 transition p-1"
                aria-label="Excluir"
             >
                🗑️
             </button>
          </div>
          
          <h3 className="font-bold text-gray-800 text-lg mb-1">{bet.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{bet.description}</p>
          
          {bet.numbers.length > 0 && (
            <div className="flex flex-wrap gap-2">
                {bet.numbers.map((num, idx) => (
                    <span key={idx} className="font-mono bg-lucky-dark text-lucky-gold px-3 py-1 rounded font-bold text-sm shadow-sm">
                        {num}
                    </span>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
