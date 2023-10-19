import { useState, useEffect } from 'react';

import Grid from './components/Grid';
import { sampleQuestions } from './data/sampleQuestions';

export type Question = { text: string; x1: number[]; x2: number[] };

function App() {
  const [deviceWidth, setDeviceWidth] = useState<string | null>(null);
  const [em] = useState(24);

  const [question, setQuestion] = useState<Question>(sampleQuestions[0]);
  const [preAnswer, setPreAnswer] = useState<number[]>([]);
  const [finalAnswer, setFinalAnswer] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', updateDeviceWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateDeviceWidth = () => {
    const PADDING = 64;
    const width = screen.width;
    const newWidth = (width - PADDING) / em;

    setDeviceWidth(`${newWidth}em`);
  };

  const getAnwerInputNumber = () => {
    return question.x1.length > question.x2.length
      ? question.x1.length
      : question.x2.length;
  };

  const nextQuestion = () => {
    const current = sampleQuestions.findIndex(q => q.text === question.text);
    const next = sampleQuestions[current + 1];
    setFinalAnswer(0);
    setPreAnswer([]);
    setQuestion(next);
  };

  const checkAnswer = () => {
    const x1 = parseInt(question.x1.join(''), 10);
    const x2 = parseInt(question.x2.join(''), 10);
    const correctAnswer = x1 * x2;

    if (finalAnswer === correctAnswer) nextQuestion();
    else alert('wrong answer | correct:' + correctAnswer);
  };

  return (
    <div className=" mx-auto h-screen px-[16px]">
      <div className="flex flex-col gap-8 text-[24px] items-center py-4">
        <div className=" text text-center flex flex-col gap-4 w-full ">
          <span className="text-base">
            Level {sampleQuestions.findIndex(q => q.text === question.text)}
          </span>
          <span className="text-[20px] font-bold">{question.text}</span>

          <Grid
            x1={question.x1}
            x2={question.x2}
            deviceEmWidth={deviceWidth || ''}
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="w-full flex justify-evenly gap-2 ">
            {Array(getAnwerInputNumber())
              .fill('')
              .map((_, index) => (
                <input
                  key={index}
                  value={preAnswer[index]}
                  onChange={e => {
                    const newVal = [...preAnswer];
                    newVal[index] = Number(e.target.value);
                    setPreAnswer(newVal);
                  }}
                  type="text"
                  placeholder="0"
                  className="text-center input input-bordered w-full "
                />
              ))}
          </div>
          <input
            value={finalAnswer}
            onChange={e => setFinalAnswer(Number(e.target.value))}
            type="text"
            placeholder="0"
            className="w-full text-center input input-bordered "
          />
          <button
            onClick={() => checkAnswer()}
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
