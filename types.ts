
export interface Animal {
  id: number;
  name: string;
  tens: number[];
}

export enum BetType {
  MILHAR = 'MILHAR',
  CENTENA = 'CENTENA',
}

export interface GeneratedBet {
  number: string;
  animal: Animal;
  type: BetType;
}

export enum HoroscopeSign {
  ARIES = 'Áries',
  TOURO = 'Touro',
  GEMEOS = 'Gêmeos',
  CANCER = 'Câncer',
  LEAO = 'Leão',
  VIRGEM = 'Virgem',
  LIBRA = 'Libra',
  ESCORPIAO = 'Escorpião',
  SAGITARIO = 'Sagitário',
  CAPRICORNIO = 'Capricórnio',
  AQUARIO = 'Aquário',
  PEIXES = 'Peixes',
}

export interface DailyPrediction {
  text: string;
  luckyNumbers: string[];
  animal: Animal;
}

export interface DreamPrediction {
  interpretation: string;
  luckyMilhar: string;
  animal: Animal;
}

export interface SavedBet {
  id: string;
  timestamp: number;
  category: 'Palpite Rápido' | 'Sonho' | 'Horóscopo' | 'Combinação';
  title: string;
  description: string;
  numbers: string[]; // Números principais para destaque
}
