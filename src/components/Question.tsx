import { useState } from 'react';
import Grid from './Grid';
import { easyQuestions } from '../data/questions';
import TopAppBar from './TopAppBar';
import { useNavigate, useParams } from 'react-router-dom';
import { updateLatestLevel } from '../services/level';

export type QuestionData = { text: string; x1: number[]; x2: number[] };

const Question = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<QuestionData>(
    easyQuestions[Number(number) - 1]
  );
  const [preAnswer, setPreAnswer] = useState<number[]>([]);
  const [finalAnswer, setFinalAnswer] = useState('');

  const getAnwerInputNumber = () => {
    return question.x1.length > question.x2.length
      ? question.x1.length
      : question.x2.length;
  };

  const nextQuestion = () => {
    const nextLevel = Number(number) + 1;

    const current = easyQuestions.findIndex(q => q.text === question.text);
    const next = easyQuestions[current + 1];
    setFinalAnswer('');
    setPreAnswer([]);
    setQuestion(next);

    updateLatestLevel(nextLevel);

    navigate('/questions/' + nextLevel);
  };

  const checkAnswer = () => {
    const x1 = parseInt(question.x1.join(''), 10);
    const x2 = parseInt(question.x2.join(''), 10);
    const correctAnswer = x1 * x2;

    if (Number(finalAnswer) === correctAnswer) nextQuestion();
    else alert('wrong answer | correct:' + correctAnswer);
  };

  return (
    <>
      <div className="h-screen flex flex-col">
        <TopAppBar question={question.text} />

        <div className="flex flex-col gap-8 text-[24px] items-center px-[16px] py-4">
          <div className=" text text-center flex flex-col gap-4 w-full">
            <div className="">
              <Grid x1={question.x1} x2={question.x2} />
            </div>
          </div>

          <div className="flex flex-col h-full  gap-4 w-full">
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
              onChange={e => setFinalAnswer(e.target.value)}
              type="text"
              placeholder="Answer here"
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

        {/* <div className="bg-neutral w-full h-full">tasdest</div> */}
      </div>
    </>
  );
};

export default Question;
