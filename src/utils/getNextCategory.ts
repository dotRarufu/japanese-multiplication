import { LevelCategory } from '../services/level';

export const getNextCategory = (previous: LevelCategory) => {
  switch (previous) {
    case 'Easy':
      return { title: 'Medium', id: 2 };
    case 'Medium':
      return { title: 'Hard', id: 3 };
    case 'Hard':
      return null;
    default:
      throw new Error('Reached ending');
  }
};
