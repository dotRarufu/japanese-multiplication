import { useNavigate } from 'react-router-dom';
import cover from '/assets/cover.png';
import logo from '/assets/logo-transparent_upscaled.png';

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-between px-4 py-4">
      {/* bg-neutral/50 */}
      {/* <div className="h-1/3 py-[16px] border border-blue-500 rounded-md flex flex-col object-contain overflow-clip justify-center"> */}
      <div className="flex flex-col gap-4 relative">
        {/* <h1 className="text-xl text-center font-bold">Vedic Tricks </h1> */}

        <img
          // h-[208px] w-[208px]
          className="object-contain  w-fit h-fit mx-auto"
          src={cover}
          alt=""
        />
        <p className="translate-y-[-70%] text-center flex gap-2 flex-col">
          <div className="h-[120px] w-[120px] bg-neutral/70  rounded-md mx-auto overflow-clip justify-center items-center flex">
            <img
              //
              className="aspect-square w-[80px]"
              src={logo}
              alt=""
            />
          </div>
          {/* <div className="font-bold text-lg">Vedic tricks</div> */}
          an interactive game for learning japanese style multiplication
        </p>
      </div>

      <button
        onClick={() => navigate('/levels')}
        className="btn btn-primary w-full"
      >
        Start
      </button>
    </div>
  );
};

export default Start;
