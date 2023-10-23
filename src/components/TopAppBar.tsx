import { FiHelpCircle } from 'react-icons/fi';
import logo from '../assets/logo.jpg';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  question: string;
};

const TopAppBar = ({ question }: Props) => {
  const navigate = useNavigate();
  const { number: level } = useParams();

  return (
    <div className="bg-primary text-primary-content w-full p-4 flex justify-between items-center shadow-lg">
      <button
        onClick={() => navigate('/levels')}
        className="btn btn-circle btn-sm btn-accent"
      >
        {level}
      </button>
      <span className="text-base font-medium">{question}</span>
      {/* <button className="btn btn-square">Logo</button> */}
      <button className="btn btn-square btn-sm btn-ghost rounded-md overflow-clip">
        <FiHelpCircle className="w-[24px] h-[24px] text-primary-content" />
      </button>
    </div>
  );
};

export default TopAppBar;
