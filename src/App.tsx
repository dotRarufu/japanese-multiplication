import { useState, useRef, useEffect } from 'react';

import Grid from './components/Grid';

function App() {
  const [deviceWidth, setDeviceWidth] = useState<string | null>(null);
  const [em, setEm] = useState(24);
  const [question, setQuestion] = useState<{ x1: number[]; x2: number[] }>({
    x1: [2, 1],
    x2: [1],
  });

  useEffect(() => {
    window.addEventListener('resize', updateDeviceWidth);
  }, []);

  const updateDeviceWidth = () => {
    const width = screen.width;
    const newWidth = width / em;

    setDeviceWidth(`${newWidth}em`);
  };

  const changeQuestion = () => {
    setQuestion({ x1: [1], x2: [3] });
  };

  return (
    <div className="max-w-[599px] mx-auto h-screen px-[16px]">
      <div className="flex flex-col gap-4 text-[24px] items-center">
        <div className="border border-neutral-content w-full">Level 1</div>
        <div className="border border-neutral-content w-full">Question</div>

        <Grid
          x1={question.x1}
          x2={question.x2}
          deviceEmWidth={deviceWidth || ''}
          em={em}
        />

        <div className="w-[250px] flex justify-evenly gap-2 ">
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
          className="w-[250px] text-center input input-bordered max-w-xs"
        />
        <button
          onClick={() => changeQuestion()}
          className="btn btn-primary w-[250px]"
        >
          Check
        </button>
      </div>
    </div>
  );
}

export default App;
