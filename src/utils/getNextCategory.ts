import { LevelCategory } from '../services/level';

export const getNextCategory = (previous: LevelCategory) => {
  switch (previous) {
    case 'Easy':
      return 'Medium';
    case 'Medium':
      return 'Hard';
    default:
      console.log('Reached ending');
      return 'Easy';
  }
};
