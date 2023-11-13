import { LevelCategories, resetLevels } from '../services/level';
import { FiHelpCircle, FiRefreshCcw } from 'react-icons/fi';
import { useMemo, useRef, useState } from 'react';
import {
  easyQuestions,
  mediumQuestions,
  hardQuestions,
} from '../data/questions';
import CategorySlide from './CategorySlide';
import tutorial1Video from '/assets/positive-cropped.mp4';
import tutorial2Video from '/assets/2-digits-negative.mp4';

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

  const resetModal = useRef<HTMLDialogElement>(null);
  const modal = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="h-screen w-full flex flex-col ">
        <div className="bg-primary text-primary-content w-full p-4 flex justify-between items-center shadow-lg">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => resetModal.current!.showModal()}
          >
            <FiRefreshCcw className="w-[24px] h-[24px] text-primary-content" />
          </button>
          <span className="text-base font-medium">Select a level</span>
          {/* <button className="btn btn-square">Logo</button> */}
          <button
            onClick={() => modal.current!.showModal()}
            className="btn btn-square btn-sm btn-ghost rounded-md overflow-clip"
          >
            {/* <FiInfo className="w-[24px] h-[24px] text-primary-content" /> */}
            <FiHelpCircle className="w-[24px] h-[24px] text-primary-content" />
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
        </div>
      </div>

      {/* ====================== Reset Modal ====================== */}
      <dialog ref={resetModal} id="reset_modal" className="modal ">
        <div className="modal-box text-primary-content bg-primary rounded-md">
          <h3 className="font-bold text-lg">Confirmation</h3>
          <p className="py-4">Are you sure you want to reset the levels?</p>
          <div className="join w-full">
            <button
              onClick={() => {
                resetModal.current!.close();
                reset();
              }}
              className="flex-1 join-item btn btn-ghost"
            >
              Yes
            </button>
            <button
              onClick={() => resetModal.current!.close()}
              className="flex-1 join-item btn rounded-md btn-accent"
            >
              No
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* ====================== Instruction Modal ====================== */}

      <dialog
        ref={modal}
        id="instructions_modal"
        className="modal"
        // onClose={() => onTutorialClose()}
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
            <div
              id="item3"
              className="bg-primary items-center carousel-item w-full flex overflow-clip flex-col"
            >
              <p className="py-4">There will be a timer on each difficulty:</p>
              <ul className="menu">
                <li>Easy - 1 minute</li>
                <li>Medium - 2 minutes</li>
                <li>Hard - 3 minutes</li>
              </ul>
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
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Levels;
