import { LevelCategories, resetLevels } from '../services/level';
import { FiInfo, FiRefreshCcw } from 'react-icons/fi';
import { useMemo, useState } from 'react';
import {
  easyQuestions,
  mediumQuestions,
  hardQuestions,
} from '../data/questions';
import CategorySlide from './CategorySlide';

const Levels = () => {
  const easy = useMemo(() => easyQuestions, []);
  const medium = useMemo(() => mediumQuestions, []);
  const hard = useMemo(() => hardQuestions, []);
  const levels: { [key: string]: number } = {
    Easy: easy.length,
    Medium: medium.length,
    Hard: hard.length,
  };

  const [, setCounter] = useState(0);

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

      <div className="carousel h-full w-screen">
        {LevelCategories.map((level, index) => (
          <CategorySlide
            key={index}
            title={level}
            total={levels[level]}
            index={index + 1}
          />
        ))}
        {/* <div
          id="slide1"
          className="carousel-item relative flex items-center w-full"
        >
          <span className="absolute w-screen bg-neutral/25 py-8 top-0 font-bold text-4xl text-center">
            Easy
          </span>
          <div className="relative px-16 flex flex-wrap overflow-y-scroll  gap-8 py-4 w-fit items-center justify-center ">
            <div className="h-full px-4 flex items-center absolute left-0">
              <a href="#slide0" className="btn btn-circle">
                ❮
              </a>
            </div>
            <div className="h-full px-4 flex items-center absolute right-0">
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
            {easy.map((_, level) => (
              <div className="w-fit flex justify-center">
                <div
                  key={level}
                  onClick={() =>
                    isLevelActive(level + 1) &&
                    navigate(`/questions/${level + 1}`)
                  }
                  className={`border-primary-content border-2 rounded-md shadow-lg flex justify-center text-center items-center btn btn-primary btn-square btn-lg ${
                    isLevelActive(level + 1)
                      ? 'bg-primary text-primary-content'
                      : 'bg-neutral text-neutral-content/25'
                  }`}
                >
                  <span className="font-bold text-xl ">{level + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          id="slide2"
          className="carousel-item relative flex items-center w-full"
        >
          <span className="absolute w-screen bg-neutral/25 py-8 top-0 font-bold text-4xl text-center">
            Medium
          </span>
          <div className="relative px-16 flex flex-wrap overflow-y-scroll  gap-8 py-4 w-fit items-center justify-center ">
            <div className="h-full px-4 flex items-center absolute left-0">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
            </div>
            <div className="h-full px-4 flex items-center absolute right-0">
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
            {medium.map((_, level) => (
              <div className="w-fit flex justify-center">
                <div
                  key={level}
                  onClick={() =>
                    isLevelActive(level + 1) &&
                    navigate(`/questions/${level + 1}`)
                  }
                  className={`border-primary-content border-2 rounded-md shadow-lg flex justify-center text-center items-center btn btn-primary btn-square btn-lg ${
                    isLevelActive(level + 1)
                      ? 'bg-primary text-primary-content'
                      : 'bg-neutral text-neutral-content/25'
                  }`}
                >
                  <span className="font-bold text-xl ">{level + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Levels;
