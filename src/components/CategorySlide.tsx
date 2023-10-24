import { useNavigate } from 'react-router-dom';
import { LevelCategory, getLatestLevel } from '../services/level';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type Props = {
  index: number;
  total: number;
  title: string;
};
const CategorySlide = ({ index, total, title }: Props) => {
  const navigate = useNavigate();

  const isLevelActive = (level: number) => {
    const latestLevel = getLatestLevel(title as LevelCategory);

    return level <= latestLevel;
  };

  return (
    <div
      id={`slide${index}`}
      className="carousel-item relative flex items-center w-full"
    >
      <span className="absolute w-screen bg-neutral/25 py-8 top-0 font-bold text-4xl text-center">
        {title}
      </span>
      <div className="relative px-16 flex flex-wrap overflow-y-scroll  gap-8 py-4 w-fit items-center justify-center ">
        <div className="h-full px-4 flex items-center absolute left-0">
          <a
            href={`#slide${index === 1 ? 1 : index - 1}`}
            className="btn btn-circle btn-primary"
          >
            <FiChevronLeft className="w-[24px] h-[24px] text-primary-content" />
          </a>
        </div>
        <div className="h-full px-4 flex items-center absolute right-0">
          <a
            href={`#slide${index === 3 ? 3 : index + 1}`}
            className="btn btn-circle btn-primary"
          >
            <FiChevronRight className="w-[24px] h-[24px] text-primary-content" />
          </a>
        </div>
        {Array(total)
          .fill('')
          .map((_, level) => (
            <div key={level} className="w-fit flex justify-center">
              <div
                onClick={() =>
                  isLevelActive(level + 1) &&
                  navigate(`/questions/${title}/${level + 1}`)
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
  );
};

export default CategorySlide;
