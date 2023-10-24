import { useNavigate } from 'react-router-dom';
import { getLatestLevel, resetLevels } from '../services/level';
import { FiInfo, FiRefreshCcw } from 'react-icons/fi';
import { useState } from 'react';

const Levels = () => {
  const levels = Array(30).fill('');
  const navigate = useNavigate();
  const [, setCounter] = useState(0);

  const isLevelActive = (level: number) => {
    const latestLevel = getLatestLevel();

    return level <= latestLevel;
  };

  const reset = () => {
    resetLevels();
    setCounter(o => o + 1);
  };

  return (
    <div className="h-screen w-full flex flex-col ">
      <div className="bg-primary text-primary-content w-full p-4 flex justify-between items-center shadow-lg">
        <button className="btn btn-ghost btn-sm" onClick={() => reset()}>
          <FiRefreshCcw className="w-[24px] h-[24px] text-primary-content" />
        </button>
        <span className="text-base font-medium">Select a level</span>
        {/* <button className="btn btn-square">Logo</button> */}
        <button className="btn btn-square btn-sm btn-ghost rounded-md overflow-clip">
          <FiInfo className="w-[24px] h-[24px] text-primary-content" />
        </button>
      </div>
      <div className="overflow-y-scroll pb-4 flex h-full w-full gap-8 flex-wrap p-4  justify-center items-center">
        {levels.map((_, level) => (
          <div
            key={level}
            onClick={() =>
              isLevelActive(level + 1) && navigate(`/questions/${level + 1}`)
            }
            className={`border-primary-content border-2 rounded-md shadow-lg flex justify-center text-center items-center btn btn-primary btn-square btn-lg ${
              isLevelActive(level + 1)
                ? 'bg-primary text-primary-content'
                : 'bg-neutral text-neutral-content/25'
            }`}
          >
            <span className="font-bold text-xl ">{level + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Levels;
