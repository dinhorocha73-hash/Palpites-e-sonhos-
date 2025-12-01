import { Animal, HoroscopeSign } from './types';

export const ANIMALS: Animal[] = [
  { id: 1, name: 'Avestruz', tens: [1, 2, 3, 4] },
  { id: 2, name: 'Águia', tens: [5, 6, 7, 8] },
  { id: 3, name: 'Burro', tens: [9, 10, 11, 12] },
  { id: 4, name: 'Borboleta', tens: [13, 14, 15, 16] },
  { id: 5, name: 'Cachorro', tens: [17, 18, 19, 20] },
  { id: 6, name: 'Cabra', tens: [21, 22, 23, 24] },
  { id: 7, name: 'Carneiro', tens: [25, 26, 27, 28] },
  { id: 8, name: 'Camelo', tens: [29, 30, 31, 32] },
  { id: 9, name: 'Cobra', tens: [33, 34, 35, 36] },
  { id: 10, name: 'Coelho', tens: [37, 38, 39, 40] },
  { id: 11, name: 'Cavalo', tens: [41, 42, 43, 44] },
  { id: 12, name: 'Elefante', tens: [45, 46, 47, 48] },
  { id: 13, name: 'Galo', tens: [49, 50, 51, 52] },
  { id: 14, name: 'Gato', tens: [53, 54, 55, 56] },
  { id: 15, name: 'Jacaré', tens: [57, 58, 59, 60] },
  { id: 16, name: 'Leão', tens: [61, 62, 63, 64] },
  { id: 17, name: 'Macaco', tens: [65, 66, 67, 68] },
  { id: 18, name: 'Porco', tens: [69, 70, 71, 72] },
  { id: 19, name: 'Pavão', tens: [73, 74, 75, 76] },
  { id: 20, name: 'Peru', tens: [77, 78, 79, 80] },
  { id: 21, name: 'Touro', tens: [81, 82, 83, 84] },
  { id: 22, name: 'Tigre', tens: [85, 86, 87, 88] },
  { id: 23, name: 'Urso', tens: [89, 90, 91, 92] },
  { id: 24, name: 'Veado', tens: [93, 94, 95, 96] },
  { id: 25, name: 'Vaca', tens: [97, 98, 99, 0] }, // 00 acts as 100 here effectively
];

export const HOROSCOPE_SIGNS = [
  { value: HoroscopeSign.ARIES, icon: '♈' },
  { value: HoroscopeSign.TOURO, icon: '♉' },
  { value: HoroscopeSign.GEMEOS, icon: '♊' },
  { value: HoroscopeSign.CANCER, icon: '♋' },
  { value: HoroscopeSign.LEAO, icon: '♌' },
  { value: HoroscopeSign.VIRGEM, icon: '♍' },
  { value: HoroscopeSign.LIBRA, icon: '♎' },
  { value: HoroscopeSign.ESCORPIAO, icon: '♏' },
  { value: HoroscopeSign.SAGITARIO, icon: '♐' },
  { value: HoroscopeSign.CAPRICORNIO, icon: '♑' },
  { value: HoroscopeSign.AQUARIO, icon: '♒' },
  { value: HoroscopeSign.PEIXES, icon: '♓' },
];
