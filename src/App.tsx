import { useState, useRef, useEffect } from 'react';

import Grid from './components/Grid';
import { sampleQuestions } from './data/sampleQuestions';

export type Question = { text: string; x1: number[]; x2: number[] };

function App() {
  const [deviceWidth, setDeviceWidth] = useState<string | null>(null);
  const [em, setEm] = useState(24);

  const [question, setQuestion] = useState<Question>(sampleQuestions[0]);

  useEffect(() => {
    window.addEventListener('resize', updateDeviceWidth);
  }, []);

  const updateDeviceWidth = () => {
    const PADDING = 64;
    const width = screen.width;
    const newWidth = (width - PADDING) / em;

    setDeviceWidth(`${newWidth}em`);
  };

  const changeQuestion = () => {
    const current = sampleQuestions.findIndex(q => q.text === question.text);
    const next = sampleQuestions[current + 1];

    setQuestion(next);
  };

  return (
    <div className=" mx-auto h-screen px-[16px]">
      <div className="flex flex-col gap-8 text-[24px] items-center">
        <div className=" text text-center flex flex-col gap-4 w-full py-2 ">
          <span className="text-base">
            Level {sampleQuestions.findIndex(q => q.text === question.text)}
          </span>
          <span className="text-base font-bold">{question.text}</span>
        </div>

        <Grid
          x1={question.x1}
          x2={question.x2}
          deviceEmWidth={deviceWidth || ''}
          em={em}
        />

        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-evenly gap-2 ">
            <input
              type="text"
              placeholder="0"
              className="text-center input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="0"
              className="text-center input input-bordered w-full max-w-xs"
            />
          </div>
          <input
            type="text"
            placeholder="0"
            className="w-full text-center input input-bordered"
          />
          <button
            onClick={() => changeQuestion()}
            className="btn btn-primary w-full"
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
