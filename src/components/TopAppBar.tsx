import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  question: string;
  time: number;
  onTutorialOpen: () => void;
  onTutorialClose: () => void;
};

// todo: add intro screen
const TopAppBar = ({ question, time, onTutorialOpen }: Props) => {
  const navigate = useNavigate();
  const { number: level } = useParams();

  const instructionsModal = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="bg-primary text-primary-content w-full p-4 flex justify-between items-center shadow-lg">
        <button
          onClick={() => navigate('/levels')}
          className="btn btn-circle btn-sm btn-accent"
        >
          {level}
        </button>

        <span className="text-lg font-bold">{question}</span>
        {/* <button className="btn btn-square">Logo</button> */}
        <button
          onClick={() => {
            instructionsModal.current!.showModal();
            onTutorialOpen();
          }}
          className="btn btn-square btn-sm btn-ghost rounded-md overflow-clip"
        >
          {time}
        </button>
      </div>
    </>
  );
};

export default TopAppBar;
