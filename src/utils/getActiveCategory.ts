import {
  easyQuestions,
  hardQuestions,
  mediumQuestions,
} from '../data/questions';
import { LevelCategory } from '../services/level';

export const getActiveCategory = (category: LevelCategory) => {
  switch (category) {
    case 'Easy':
      return easyQuestions;
    case 'Medium':
      return mediumQuestions;
    case 'Hard':
      return hardQuestions;

    default:
      console.error('Unknown category');
      return easyQuestions;
  }
};
