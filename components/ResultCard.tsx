import React from 'react';
import { Animal } from '../types';

interface ResultCardProps {
  title: string;
  number: string;
  animal: Animal;
  description?: string;
  highlight?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ title, number, animal, description, highlight = false }) => {
  return (
    <div className={`p-6 rounded-2xl shadow-lg border-2 ${highlight ? 'bg-lucky-dark border-lucky-gold text-white' : 'bg-white border-emerald-100 text-gray-800'} transition-all transform hover:scale-105`}>
      <h3 className={`text-sm uppercase tracking-wider font-bold mb-2 ${highlight ? 'text-lucky-gold' : 'text-emerald-600'}`}>
        {title}
      </h3>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl font-mono font-bold tracking-widest">
            {number}
        </div>
        <div className={`text-xs px-2 py-1 rounded-full ${highlight ? 'bg-lucky-gold text-lucky-dark' : 'bg-emerald-100 text-emerald-800'}`}>
            Grupo {animal.id.toString().padStart(2, '0')}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${highlight ? 'bg-white/10' : 'bg-emerald-50'}`}>
           🐾
        </div>
        <div>
            <p className="text-lg font-bold">{animal.name}</p>
            {description && <p className={`text-xs ${highlight ? 'text-gray-300' : 'text-gray-500'}`}>{description}</p>}
        </div>
      </div>
      
      <div className="mt-3 text-xs opacity-75">
        Dezenas: {animal.tens.map(t => t.toString().padStart(2, '0')).join(', ')}
      </div>
    </div>
  );
};
