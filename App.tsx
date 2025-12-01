
import React, { useState } from 'react';
import { Generator } from './components/Generator';
import { Inverter } from './components/Inverter';
import { Horoscope } from './components/Horoscope';
import { DailyAnimal } from './components/DailyAnimal';
import { DreamBook } from './components/DreamBook';
import { GroupTensGenerator } from './components/GroupTensGenerator';
import { SavedBets } from './components/SavedBets';

enum Tab {
  HOME = 'home',
  INVERTER = 'inverter',
  HOROSCOPE = 'horoscope',
  DREAMS = 'dreams',
  COMBOS = 'combos',
  SAVED = 'saved'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-lucky-dark text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="text-4xl filter drop-shadow-md">🦁</span>
                <div>
                    <h1 className="text-xl md:text-2xl font-bold leading-none text-lucky-gold">Mestre Dinho</h1>
                    <p className="text-xs text-emerald-200 font-medium tracking-wide">Gerador de Palpites & Sonhos</p>
                </div>
            </div>
            {/* Desktop shortcut for saved */}
            <button 
              onClick={() => setActiveTab(Tab.SAVED)}
              className="hidden md:flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition"
            >
              <span>📂</span> Meus Palpites
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 space-y-6">
        
        {/* Navigation Tabs (Desktop) */}
        <div className="hidden md:flex space-x-2 bg-white p-1 rounded-lg shadow-sm border border-gray-200 mb-6 overflow-x-auto">
            <button 
                onClick={() => setActiveTab(Tab.HOME)}
                className={`flex-1 min-w-[100px] py-2 px-4 rounded-md font-medium transition ${activeTab === Tab.HOME ? 'bg-lucky-green text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
            >
                Início
            </button>
            <button 
                onClick={() => setActiveTab(Tab.DREAMS)}
                className={`flex-1 min-w-[100px] py-2 px-4 rounded-md font-medium transition ${activeTab === Tab.DREAMS ? 'bg-lucky-green text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
            >
                Sonhos
            </button>
            <button 
                onClick={() => setActiveTab(Tab.COMBOS)}
                className={`flex-1 min-w-[100px] py-2 px-4 rounded-md font-medium transition ${activeTab === Tab.COMBOS ? 'bg-lucky-green text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
            >
                Combinados
            </button>
            <button 
                onClick={() => setActiveTab(Tab.INVERTER)}
                className={`flex-1 min-w-[100px] py-2 px-4 rounded-md font-medium transition ${activeTab === Tab.INVERTER ? 'bg-lucky-green text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
            >
                Inversão
            </button>
            <button 
                onClick={() => setActiveTab(Tab.HOROSCOPE)}
                className={`flex-1 min-w-[100px] py-2 px-4 rounded-md font-medium transition ${activeTab === Tab.HOROSCOPE ? 'bg-lucky-green text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
            >
                Horóscopo
            </button>
        </div>

        {/* Dynamic Content */}
        <div className="animate-fade-in space-y-8">
            {activeTab === Tab.HOME && (
                <>
                    <DailyAnimal />
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
                         <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span>🎰</span> Gerador Rápido
                        </h2>
                        <Generator />
                    </div>
                </>
            )}

            {activeTab === Tab.DREAMS && <DreamBook />}

            {activeTab === Tab.INVERTER && <Inverter />}
            
            {activeTab === Tab.HOROSCOPE && <Horoscope />}

            {activeTab === Tab.COMBOS && <GroupTensGenerator />}

            {activeTab === Tab.SAVED && <SavedBets />}
        </div>

      </main>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button 
            onClick={() => setActiveTab(Tab.HOME)}
            className={`flex flex-col items-center p-2 rounded-lg w-1/6 ${activeTab === Tab.HOME ? 'text-lucky-green' : 'text-gray-400'}`}
        >
            <span className="text-lg">🎲</span>
            <span className="text-[9px] font-medium">Início</span>
        </button>
        <button 
            onClick={() => setActiveTab(Tab.DREAMS)}
            className={`flex flex-col items-center p-2 rounded-lg w-1/6 ${activeTab === Tab.DREAMS ? 'text-lucky-green' : 'text-gray-400'}`}
        >
            <span className="text-lg">🌙</span>
            <span className="text-[9px] font-medium">Sonhos</span>
        </button>
        <button 
             onClick={() => setActiveTab(Tab.COMBOS)}
             className={`flex flex-col items-center p-2 rounded-lg w-1/6 ${activeTab === Tab.COMBOS ? 'text-lucky-green' : 'text-gray-400'}`}
        >
            <span className="text-lg">🧩</span>
            <span className="text-[9px] font-medium">Combos</span>
        </button>
        <button 
             onClick={() => setActiveTab(Tab.INVERTER)}
             className={`flex flex-col items-center p-2 rounded-lg w-1/6 ${activeTab === Tab.INVERTER ? 'text-lucky-green' : 'text-gray-400'}`}
        >
            <span className="text-lg">🔄</span>
            <span className="text-[9px] font-medium">Inver.</span>
        </button>
        <button 
             onClick={() => setActiveTab(Tab.HOROSCOPE)}
             className={`flex flex-col items-center p-2 rounded-lg w-1/6 ${activeTab === Tab.HOROSCOPE ? 'text-lucky-green' : 'text-gray-400'}`}
        >
            <span className="text-lg">🔮</span>
            <span className="text-[9px] font-medium">Sig.</span>
        </button>
        <button 
             onClick={() => setActiveTab(Tab.SAVED)}
             className={`flex flex-col items-center p-2 rounded-lg w-1/6 ${activeTab === Tab.SAVED ? 'text-lucky-green' : 'text-gray-400'}`}
        >
            <span className="text-lg">📂</span>
            <span className="text-[9px] font-medium">Salvos</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
