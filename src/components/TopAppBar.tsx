import { useRef } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import tutorial1 from '../assets/logo.jpg';

type Props = {
  question: string;
};

const TopAppBar = ({ question }: Props) => {
  const navigate = useNavigate();
  const { number: level } = useParams();

  const modal = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="bg-primary text-primary-content w-full p-4 flex justify-between items-center shadow-lg">
        <button
          onClick={() => navigate('/levels')}
          className="btn btn-circle btn-sm btn-accent"
        >
          {level}
        </button>

        <span className="text-base font-medium">{question}</span>
        {/* <button className="btn btn-square">Logo</button> */}
        <button
          onClick={() => modal.current!.showModal()}
          className="btn btn-square btn-sm btn-ghost rounded-md overflow-clip"
        >
          <FiHelpCircle className="w-[24px] h-[24px] text-primary-content" />
        </button>
      </div>

      {/* ====================== Instruction Modal ====================== */}
      <dialog ref={modal} id="instructions_modal" className="modal">
        <div className="modal-box text-primary-content bg-primary rounded-md overflow-y-clip">
          <h3 className="font-bold text-lg">Tutorial</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="carousel w-full">
            <div id="item1" className="carousel-item w-full flex flex-col">
              <img src={tutorial1} alt="" />
              <p className="py-4">There will be a timer on each difficulty:</p>
            </div>
            <div id="item2" className="carousel-item w-full flex flex-col">
              <img src={tutorial1} alt="" />
              <p className="py-4">There will be a timer on each difficulty:</p>
            </div>
            <div id="item3" className="carousel-item w-full flex flex-col">
              <img src={tutorial1} alt="" />
              <p className="py-4">There will be a timer on each difficulty:</p>
            </div>
            <div id="item4" className="carousel-item w-full flex flex-col">
              <img src={tutorial1} alt="" />
              <p className="py-4">There will be a timer on each difficulty:</p>
            </div>
          </div>
          <div className="flex justify-center w-full py-2 gap-2">
            <a href="#item1" className="btn btn-xs">
              1
            </a>
            <a href="#item2" className="btn btn-xs">
              2
            </a>
            <a href="#item3" className="btn btn-xs">
              3
            </a>
            <a href="#item4" className="btn btn-xs">
              4
            </a>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default TopAppBar;
