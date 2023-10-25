import { useEffect, useRef, useState } from 'react';
import Grid from './Grid';
import TopAppBar from './TopAppBar';
import { useNavigate, useParams } from 'react-router-dom';
import { LevelCategory, updateLatestLevel } from '../services/level';
import { getActiveCategory } from '../utils/getActiveCategory';
import { getNextCategory } from '../utils/getNextCategory';
import { getCategoryTimeLimit } from '../utils/getCategoryTimeLimit';

export type QuestionData = { text: string; x1: number[]; x2: number[] };

const Question = () => {
  const { number, category } = useParams();
  const navigate = useNavigate();
  const activeQuestionSet = getActiveCategory(category as LevelCategory);
  const [question, setQuestion] = useState<QuestionData>(
    activeQuestionSet[Number(number) - 1]
  );
  const [preAnswer, setPreAnswer] = useState<string[]>([]);
  const [finalAnswer, setFinalAnswer] = useState('');
  const [time, setTime] = useState(0);
  const timerResModal = useRef<HTMLDialogElement>(null);

  const getAnwerInputNumber = () => {
    return question.x1.length > question.x2.length
      ? question.x1.length
      : question.x2.length;
  };

  // Timer
  useEffect(() => {
    const max = getCategoryTimeLimit(category as LevelCategory);
    console.log('max:', max);
    if (time === max) {
      timerResModal.current!.showModal();
    }

    const interval = setInterval(() => {
      if (time < max) {
        setTime(old => old + 1);
        console.log(time + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      // console.log('interval cleared');
    };
  }, [category, navigate, time]);

  // For setting correct question when changing category
  useEffect(() => {
    const next = activeQuestionSet[Number(number) - 1];
    setQuestion(next);
  }, [activeQuestionSet, number]);

  const nextQuestion = () => {
    const nextLevel = Number(number) + 1;

    const current = activeQuestionSet.findIndex(q => q.text === question.text);
    const next = activeQuestionSet[current + 1];
    setFinalAnswer('');
    setPreAnswer([]);
    setQuestion(next);
    setTime(0);

    if (nextLevel > activeQuestionSet.length) {
      const nextCategory = getNextCategory(category as LevelCategory);

      updateLatestLevel(1, nextCategory.title as LevelCategory);
      // navigate(`/questions/${nextCategory}/${1}`);
      navigate(`/levels/#slide${nextCategory.id}`);
      return;
    }

    updateLatestLevel(nextLevel, category as LevelCategory);
    navigate(`/questions/${category}/${nextLevel}`);
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
                    placeholder="0"
                    value={preAnswer.length === 0 ? '' : preAnswer[index]}
                    onChange={e => {
                      const newVal = [...preAnswer];
                      newVal[index] = e.target.value;
                      setPreAnswer(newVal);
                    }}
                    type="text"
                    className="w-full text-center input input-primary bg-primary text-primary-content placeholder:text-primary-content shadow-md font-bold"
                  />
                ))}
            </div>
            <input
              value={finalAnswer}
              onChange={e => setFinalAnswer(e.target.value)}
              type="text"
              placeholder="Answer here"
              className="w-full text-center input input-primary bg-primary text-primary-content placeholder:text-primary-content shadow-md font-bold"
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

      {/* ====================== Reset Modal ====================== */}
      <dialog ref={timerResModal} id="reset_modal" className="modal ">
        <div className="modal-box text-primary-content bg-primary rounded-md">
          <h3 className="font-bold text-lg">Game Over</h3>
          <p className="py-4">You've ran out of time</p>

          <button
            onClick={() => {
              timerResModal.current!.close();
              navigate('levels');
            }}
            className="w-full btn btn-ghost"
          >
            Go Back
          </button>
        </div>

        <form
          method="dialog"
          onClick={() => {
            timerResModal.current!.close();
            navigate('levels');
          }}
          className="modal-backdrop"
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Question;
