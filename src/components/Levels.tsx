import { FiHelpCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Levels = () => {
  const levels = Array(30).fill('');
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col ">
      <div className=" bg-primary text-primary-content w-full p-4 flex justify-center items-center shadow-lg">
        <span className="text-base font-medium">Select a level</span>
      </div>
      <div className="overflow-y-scroll pb-4 flex h-full w-full gap-8 flex-wrap p-4  justify-center items-center">
        {levels.map((_, level) => (
          <div
            key={level}
            onClick={() => navigate(`/questions/${level + 1}`)}
            className="border-primary-content border-2 bg-primary rounded-md shadow-lg flex justify-center text-center items-center btn btn-primary btn-square btn-lg"
          >
            <span className="font-bold text-xl text-primary-content">
              {level + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Levels;