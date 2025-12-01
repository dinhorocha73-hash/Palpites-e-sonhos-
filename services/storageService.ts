
import { SavedBet } from '../types';

const STORAGE_KEY = 'mestre_dinho_saved_bets';

export const getSavedBets = (): SavedBet[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Erro ao ler palpites salvos", e);
    return [];
  }
};

export const saveBet = (bet: Omit<SavedBet, 'id' | 'timestamp'>) => {
  try {
    const bets = getSavedBets();
    const newBet: SavedBet = {
      ...bet,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    // Adicionar no início da lista
    const updatedBets = [newBet, ...bets];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBets));
    return true;
  } catch (e) {
    console.error("Erro ao salvar palpite", e);
    return false;
  }
};

export const deleteBet = (id: string) => {
  try {
    const bets = getSavedBets();
    const updatedBets = bets.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBets));
    return updatedBets;
  } catch (e) {
    console.error("Erro ao deletar palpite", e);
    return [];
  }
};
