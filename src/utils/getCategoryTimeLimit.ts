import { LevelCategory } from '../services/level';

export const getCategoryTimeLimit = (category: LevelCategory) => {
  const timeLimits = {
    Easy: 60,
    Medium: 120,
    Hard: 180,
  };

  return timeLimits[category];
};
