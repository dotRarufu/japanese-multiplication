const KEYS = {
  level: 'JapaneseMultiplication_Level',
  name: 'JapaneseMultiplication_Name',
};

export const updateLatestLevel = (level: number) => {
  localStorage.setItem(KEYS.level, level.toString());
};

export const getLatestLevel = () => {
  const level = localStorage.getItem(KEYS.level);

  if (level === null) {
    console.error('Latest level is null');

    return 1;
  }

  return Number(level);
};

export const resetLevels = () => {
  const keys = Object.values(KEYS);
  keys.forEach(key => localStorage.removeItem(key));
};
