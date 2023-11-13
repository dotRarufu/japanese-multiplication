import { useNavigate } from 'react-router-dom';
import cover from '/assets/logo-transparent.png';

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-between px-4 py-4">
      {/* bg-neutral/50 */}
      <div className="h-1/2  rounded-md flex flex-col justify-center">
        <img
          className="object-contain h-[208px] w-[208px] mx-auto aspect-square"
          src={cover}
          alt=""
        />
      </div>

      <button onClick={() => navigate("/levels")} className="btn btn-primary w-full">Start</button>
    </div>
  );
};

export default Start;
