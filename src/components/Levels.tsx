import { LevelCategories, resetLevels } from '../services/level';
import { FiInfo, FiRefreshCcw } from 'react-icons/fi';
import { useMemo, useRef, useState } from 'react';
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

  const resetModal = useRef<HTMLDialogElement>(null);
  const instructionsModal = useRef<HTMLDialogElement>(null);

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
            onClick={() => instructionsModal.current!.showModal()}
            className="btn btn-square btn-sm btn-ghost rounded-md overflow-clip"
          >
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
        ref={instructionsModal}
        id="instructions_modal"
        className="modal "
      >
        <div className="modal-box text-primary-content bg-primary rounded-md">
          {/* <h3 className="font-bold text-lg">Instructions</h3> */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="py-4">There will be a timer on each difficulty:</p>
          <ul className="menu">
            <li>Easy - 1 minute</li>
            <li>Medium - 2 minutes</li>
            <li>Hard - 3 minutes</li>
          </ul>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Levels;
