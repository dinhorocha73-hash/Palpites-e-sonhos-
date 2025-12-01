import React, { useState } from 'react';
import { getPermutations, getAnimalByNumber } from '../utils/gameLogic';

export const Inverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleInvert = () => {
    if (input.length !== 4 || isNaN(parseInt(input))) {
      setError('Digite exatamente 4 números.');
      return;
    }
    setError('');
    const perms = getPermutations(input);
    setResults(perms);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>🔄</span> Inversão de Milhar
      </h2>
      <p className="text-gray-600 mb-4 text-sm">
        Digite 4 dígitos para ver todas as combinações possíveis para jogar (Inversão).
      </p>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          maxLength={4}
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/\D/g, ''))}
          placeholder="Ex: 1234"
          className="flex-1 p-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-lucky-green font-mono text-xl text-center tracking-widest"
        />
        <button
          onClick={handleInvert}
          className="bg-lucky-dark text-white px-6 rounded-lg font-semibold hover:bg-emerald-900 transition"
        >
          Inverter
        </button>
      </div>
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {results.length > 0 && (
        <div className="bg-emerald-50 p-4 rounded-lg">
          <p className="text-sm text-emerald-800 mb-2 font-semibold">
            {results.length} combinações encontradas:
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {results.map((res, idx) => {
                const animal = getAnimalByNumber(res);
                return (
                    <div key={idx} className="bg-white p-2 rounded border border-emerald-100 text-center shadow-sm flex flex-col items-center">
                        <span className="font-mono font-bold text-lg text-gray-800">{res}</span>
                        <span className="text-[10px] uppercase text-emerald-600">{animal.name}</span>
                    </div>
                )
            })}
          </div>
        </div>
      )}
    </div>
  );
};
