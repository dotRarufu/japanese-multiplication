import { useState } from 'react';
import Grid from './components/Grid';
import { sampleQuestions } from './data/sampleQuestions';

export type Question = { text: string; x1: number[]; x2: number[] };

function App() {
  const [question, setQuestion] = useState<Question>(sampleQuestions[0]);
  const [preAnswer, setPreAnswer] = useState<number[]>([]);
  const [finalAnswer, setFinalAnswer] = useState(0);

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
    <>
      <div className=" relative ">
        <div className="flex flex-col gap-8 text-[24px] items-center px-[16px] py-4">
          <div className=" text text-center flex flex-col gap-4 w-full">
            <div className="rounded-lg flex flex-col gap-2 bg-neutral/50 py-2">
              <span className="text-base">
                Level {sampleQuestions.findIndex(q => q.text === question.text)}
              </span>
              <span className="text-[20px] font-bold">{question.text}</span>
            </div>

            <div className="">
              <Grid x1={question.x1} x2={question.x2} />
            </div>
          </div>

          <div className="flex flex-col h-full gap-4 w-full">
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
                    className="w-full text-center input input-primary bg-primary text-primary-content shadow-md font-bold"
                  />
                ))}
            </div>
            <input
              value={finalAnswer}
              onChange={e => setFinalAnswer(Number(e.target.value))}
              type="text"
              placeholder="0"
              className="w-full text-center input input-primary bg-primary text-primary-content shadow-md font-bold"
            />
            <button
              onClick={() => checkAnswer()}
              className="btn btn-accent w-full"
            >
              Final Answer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
