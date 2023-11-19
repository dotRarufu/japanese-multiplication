import { useEffect, useRef, useState } from 'react';
import Grid from './Grid';
import TopAppBar from './TopAppBar';
import { useNavigate, useParams } from 'react-router-dom';
import { LevelCategory, updateLatestLevel } from '../services/level';
import { getActiveCategory } from '../utils/getActiveCategory';
import { getNextCategory } from '../utils/getNextCategory';
import { getCategoryTimeLimit } from '../utils/getCategoryTimeLimit';

export type QuestionData = {
  text: string;
  x1: number[];
  x2: number[];
  guide?: string[];
};

const Question = () => {
  const { number, category } = useParams();
  const navigate = useNavigate();
  const activeQuestionSet = getActiveCategory(category as LevelCategory);
  const [question, setQuestion] = useState<QuestionData>(
    activeQuestionSet[Number(number) - 1]
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [preAnswer, setPreAnswer] = useState<string[]>([]);
  const [finalAnswer, setFinalAnswer] = useState('');
  const [time, setTime] = useState(0);
  const timerResModal = useRef<HTMLDialogElement>(null);
  const answerResModal = useRef<HTMLDialogElement>(null);
  const [shouldResetMarks, setShouldResetMarks] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [allIsCounted, setAllIsCounted] = useState(false);

  const getAnwerInputNumber = () => {
    switch (category) {
      case 'Medium':
        return 2;
      case 'Hard':
        return 3;

      default:
        return 1;
    }
  };

  // Timer
  useEffect(() => {
    const max = getCategoryTimeLimit(category as LevelCategory);

    if (time === max) {
      timerResModal.current!.showModal();

      return;
    }

    if (isTimerPaused) return;

    const interval = setInterval(() => {
      if (time < max) {
        setTime(old => old + 1);
        // console.log(time + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      // console.log('interval cleared');
    };
  }, [category, isTimerPaused, navigate, time]);

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
    setShouldResetMarks(o => o + 1);
    setAllIsCounted(false);

    if (nextLevel > activeQuestionSet.length) {
      const nextCategory = getNextCategory(category as LevelCategory);

      if (nextCategory === null) {
        navigate(`/levels`);

        return;
      }

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

    const hasNoGuide = question.guide === undefined;
    const preAnswersAreCorrect =
      !hasNoGuide &&
      preAnswer.length !== 0 &&
      preAnswer.every(p => question.guide?.includes(p));
    const guideAnswersAreCorrect = hasNoGuide || preAnswersAreCorrect;
    const intersectionsAreCounted = category === 'Easy' || allIsCounted;

    if (
      Number(finalAnswer) === correctAnswer &&
      guideAnswersAreCorrect &&
      intersectionsAreCounted
    )
      setIsCorrect(true);
    else {
      setIsCorrect(false);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col">
        <TopAppBar
          question={question.text}
          onTutorialOpen={() => {
            setIsTimerPaused(true);
          }}
          onTutorialClose={() => {
            setIsTimerPaused(false);
          }}
          time={time}
        />

        <div className="flex flex-col gap-8 text-[24px] items-center px-[16px] py-4">
          <div className=" text text-center flex flex-col gap-4 w-full">
            <div className="">
              <Grid
                allIsCounted={() => setAllIsCounted(true)}
                shouldResetMarks={shouldResetMarks}
                x1={question.x1}
                x2={question.x2}
              />
            </div>
          </div>

          <div className="flex flex-col h-full  gap-4 w-full">
            <div className="w-full flex justify-evenly gap-2 ">
              {getAnwerInputNumber() > 1 &&
                Array(getAnwerInputNumber())
                  .fill('')
                  .map((_, index) => (
                    <input
                      key={index}
                      placeholder="--"
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
              onClick={() => {
                checkAnswer();
                answerResModal.current!.showModal();
              }}
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
            className="w-full btn btn-accent"
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

      {/* ====================== Result Modal ====================== */}
      <dialog ref={answerResModal} id="answer_res_modal" className="modal ">
        <div className="modal-box text-primary-content bg-primary rounded-md">
          <h3 className="font-bold text-lg">
            {isCorrect ? 'Correct' : 'Wrong'}
          </h3>
          <p className="py-4">
            {isCorrect
              ? "You've answered the question correct"
              : !allIsCounted
              ? 'You have to tap all of the circles'
              : 'Sorry, wrong answer'}
          </p>

          {isCorrect ? (
            <button
              onClick={() => {
                answerResModal.current!.close();
                nextQuestion();
              }}
              className="w-full btn btn-accent"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={() => {
                answerResModal.current!.close();
              }}
              className="w-full btn btn-ghost"
            >
              OK
            </button>
          )}
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
