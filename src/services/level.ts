export type LevelCategory = 'Easy' | 'Medium' | 'Hard';
export const LevelCategories: LevelCategory[] = ['Easy', 'Medium', 'Hard'];

type AppData = {
  name: string;
  levels: {
    category: LevelCategory;
    level: number;
  }[];
};

const AppDataKey = 'JapaneseMultiplicationData';

export const updateLatestLevel = (level: number, category: LevelCategory) => {
  const stringData = localStorage.getItem(AppDataKey);
  const data =
    stringData !== null ? (JSON.parse(stringData) as AppData) : DefaultAppData;

  const newLevels = data.levels.map(l =>
    l.category === category ? { ...l, level } : l
  );
  const newData = { ...data, levels: newLevels };

  const newStringData = JSON.stringify(newData);
  localStorage.setItem(AppDataKey, newStringData);
};

const DefaultAppData: AppData = {
  levels: [
    { category: 'Easy', level: 1 },
    { category: 'Medium', level: 0 },
    { category: 'Hard', level: 0 },
  ],
  name: '',
};

export const getLatestLevel = (category: LevelCategory) => {
  const stringData = localStorage.getItem(AppDataKey);
  const data =
    stringData !== null ? (JSON.parse(stringData) as AppData) : DefaultAppData;
  const matchedCategory = data.levels.find(l => l.category === category);

  if (!matchedCategory) {
    console.error('Latest level is null');

    return 1;
  }

  return Number(matchedCategory.level);
};

export const resetLevels = () => {
  localStorage.removeItem(AppDataKey);
};
