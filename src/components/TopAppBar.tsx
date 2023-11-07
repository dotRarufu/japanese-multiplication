import { useRef } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import tutorial1Video from '/assets/positive-cropped.mp4';
import tutorial2Video from '/assets/negative-cropped.mp4';

type Props = {
  question: string;
  onTutorialOpen: () => void;
  onTutorialClose: () => void;
};

// todo: add intro screen
const TopAppBar = ({ question, onTutorialClose, onTutorialOpen }: Props) => {
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
          onClick={() => {
            modal.current!.showModal();
            onTutorialOpen();
          }}
          className="btn btn-square btn-sm btn-ghost rounded-md overflow-clip"
        >
          <FiHelpCircle className="w-[24px] h-[24px] text-primary-content" />
        </button>
      </div>

      {/* ====================== Instruction Modal ====================== */}
      <dialog
        ref={modal}
        id="instructions_modal"
        className="modal"
        onClose={() => onTutorialClose()}
      >
        <div className="modal-box text-primary-content bg-primary rounded-md overflow-y-scroll h-full flex flex-col gap-1">
          <h3 className="font-bold text-lg">Tutorial</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="carousel w-full bg-neutral/50 rounded-md ">
            <div
              id="item1"
              className="carousel-item w-full flex overflow-clip flex-col"
            >
              <video
                className="mx-auto object-contain rounded-md overflow-clip h-full w-fit"
                autoPlay
                loop
              >
                <source src={tutorial1Video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div
              id="item2"
              className=" carousel-item w-full flex overflow-clip flex-col"
            >
              <video
                className="mx-auto object-contain rounded-md overflow-clip h-full w-fit"
                autoPlay
                loop
              >
                <source src={tutorial2Video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="flex justify-center w-full py-2 gap-2">
            <a href="#item1" className="btn btn-xs">
              1
            </a>
            <a href="#item2" className="btn btn-xs">
              2
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
