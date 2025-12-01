import { ANIMALS } from '../constants';
import { Animal } from '../types';

export const getAnimalByNumber = (numStr: string): Animal => {
  // Extract last two digits
  const lastTwo = parseInt(numStr.slice(-2), 10);
  
  if (isNaN(lastTwo)) {
    return ANIMALS[0]; // Fallback
  }

  // Handle the "00" case which belongs to Vaca (25)
  // Logic: Tens 97, 98, 99, 00 are Vaca.
  // Standard logic: Math.ceil(ten / 4) = group.
  
  let group = 0;
  if (lastTwo === 0) {
    group = 25;
  } else {
    group = Math.ceil(lastTwo / 4);
  }

  return ANIMALS.find(a => a.id === group) || ANIMALS[0];
};

export const generateRandomNumber = (digits: number): string => {
  let result = '';
  for (let i = 0; i < digits; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
};

export const getPermutations = (str: string): string[] => {
  if (str.length <= 1) return [str];
  
  const results = new Set<string>();
  
  const permute = (s: string, prefix: string = '') => {
    if (s.length === 0) {
      results.add(prefix);
    } else {
      for (let i = 0; i < s.length; i++) {
        permute(s.slice(0, i) + s.slice(i + 1), prefix + s[i]);
      }
    }
  };

  permute(str);
  return Array.from(results).sort();
};

export const generateRandomUniqueAnimals = (count: number): Animal[] => {
  // Fisher-Yates shuffle copy of ANIMALS
  const shuffled = [...ANIMALS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};

export const generateRandomUniqueTens = (count: number): string[] => {
  const tens = new Set<string>();
  while (tens.size < count) {
    const num = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    tens.add(num);
  }
  return Array.from(tens);
};