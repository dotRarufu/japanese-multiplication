import { useState, useRef, useEffect } from 'react';
import isOverlapping from '../utils/isOverlapping';
import Intersection from './Intersection';

export type GridProps = {
  x1: number[];
  x2: number[];
};

function Grid({ x1, x2 }: GridProps) {
  const [, setTime] = useState(new Date());
  const verticals = useRef<(HTMLDivElement | null)[]>([]);
  const horizontals = useRef<(HTMLDivElement | null)[]>([]);
  const overlapElems = useRef<(HTMLDivElement | null)[]>([]);
  const parentElem = useRef<HTMLDivElement | null>(null);

  const [question, setQuestion] = useState<{ x1: number[]; x2: number[] }>({
    x1,
    x2,
  });

  const check = () => {
    const noNullVertical =
      verticals.current.filter(i => i === null).length === 0;
    const noNullHorizontal =
      horizontals.current.filter(i => i === null).length === 0;
    const noNullOverlapElems =
      overlapElems.current.filter(i => i === null).length === 0;
    const parent = parentElem.current;

    // Match lines width to parent
    // verticals.current.forEach(elem => {
    //   elem!.style.height = `${parentElem.current!.offsetHeight}px`;
    // });
    // horizontals.current.forEach(elem => {
    //   elem!.style.width = parentElem.current!.style.width;
    // });

    if (
      !noNullVertical ||
      !noNullHorizontal ||
      !noNullOverlapElems ||
      parent === null
    )
      return;

    let currentOverlapElemIndex = -1;

    const x1 = Number(question.x1.join(''));
    const x2 = Number(question.x2.join(''));
    const answer = x1 * x2;
    const isShaded = x1 < 0 && x2 < 0 ? false : answer > 0 ? true : null;
    const notSameDigitCount = question.x1.length !== question.x2.length;
    const shouldShade =
      verticals.current.length > 1 && isShaded === null && notSameDigitCount;
    let alreadyShadedOne = false;

    horizontals.current.forEach((h, hIndex) => {
      if (hIndex > 1) alreadyShadedOne = true;

      verticals.current.forEach(v => {
        const isOverlap = isOverlapping(h!, v!, parentElem.current!);

        if (isOverlap) {
          const [x, y] = isOverlap;
          currentOverlapElemIndex += 1;
          const circleRadius = 8; // Width (diameter) divided by 2
          const overlapElem = overlapElems.current[currentOverlapElemIndex]!;

          overlapElem.style.display = 'block';
          const overlapX = x - circleRadius - parent.getBoundingClientRect().x;
          const overlapY = y - circleRadius - parent.getBoundingClientRect().y;
          overlapElem.style.left = `${overlapX}px`;
          overlapElem.style.top = `${overlapY}px`;
          overlapElem.style.transform = 'translate(-15%, -15%)';
          // console.log('overlap show:', x, y);

          // Shade
          if (shouldShade && !alreadyShadedOne) {
            overlapElem.style.backgroundColor = '#fcd662';
          }
        }
      });
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      check();
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sync questions
  useEffect(() => {
    setQuestion({ x1, x2 });
  }, [x1, x2]);

  const generateVerticals = () => {
    verticals.current = [];

    return question.x1.map((digit, i1) => (
      <div key={i1} className="flex gap-8 w-full justify-center ">
        {Array(Math.abs(digit === 0 ? 1 : digit))
          .fill('')
          .map((_, i2) => (
            <div
              key={i2}
              className="relative"
              ref={element =>
                (verticals.current = [
                  ...[...verticals.current].filter(v => v !== null),
                  element,
                ])
              }
            >
              <div
                className={`left-[-1px] absolute w-[0.25em] border-success border-y-0 border-l-4 rounded-full h-full ${
                  digit === 0 ? 'border-dashed' : 'border-solid'
                } shadow-md`}
              />
            </div>
          ))}
      </div>
    ));
  };

  const generateHorizontals = () => {
    horizontals.current = [];

    return question.x2.map((digit, i1) => (
      <div key={i1} className="flex gap-6 flex-col w-full">
        {Array(Math.abs(digit === 0 ? 1 : digit))
          .fill('')
          .map((_, i2) => (
            <div
              key={i2}
              className="relative"
              ref={element =>
                (horizontals.current = [
                  ...[...horizontals.current].filter(v => v !== null),
                  element,
                ])
              }
            >
              <div
                className={`top-[2px] h-[0.25em] border-4 border-error border-x-0 border-b-0 rounded-full w-full ${
                  digit === 0 ? 'border-dashed' : 'border-solid'
                } shadow-md`}
              />
            </div>
          ))}
      </div>
    ));
  };

  const generateIntersections = () => {
    overlapElems.current = [];
    const x1 = Number(question.x1.join(''));
    const x2 = Number(question.x2.join(''));
    const answer = x1 * x2;
    const isShaded = x1 < 0 && x2 < 0 ? false : answer > 0 ? true : null;

    const x1HasZero = question.x1.filter(a => a === 0).length > 0;
    const x2HasZero = question.x2.filter(a => a === 0).length > 0;
    const x1Length = question.x1.length;
    const x2Length = question.x2.length;

    const total =
      x1HasZero || x2HasZero ? x1Length * x2Length : Math.abs(answer);

    return Array(total)
      .fill('')
      .map((_, i) => (
        <Intersection
          key={i}
          isShaded={!!isShaded}
          ref={element =>
            (overlapElems.current = [
              ...[...overlapElems.current].filter(v => v !== null),
              element,
            ])
          }
        />
      ));
  };

  return (
    <div className="p-4 w-full rounded-lg  ">
      <div
        ref={parentElem}
        className="mx-auto aspect-square h-full max-w-[50vh] sm:max-w-[70vw]  relative"
      >
        {/* Intersections */}
        {generateIntersections()}

        {/* Verticals */}
        <div className=" overflow-hidden  px-2 w-full h-full flex justify-around absolute left-0 top-0 ">
          {generateVerticals()}
        </div>

        {/* Horizontals */}
        <div className="py-2 w-full h-full flex  flex-col absolute left-0 top-0 justify-around">
          {generateHorizontals()}
        </div>
      </div>
    </div>
  );
}

export default Grid;
// const randomPoints = {
//   x: Math.round(Math.random() * 100),
//   y: Math.round(Math.random() * 100),
// };
// overlapElem.current!.style.left = `${a.x}px`;
// overlapElem.current!.style.top = `${a.y}px`;

// <div
//   key={i}
//   ref={element => overlapElems.current.push(element)}
//   className="hover:bg-green-500 border-neutral-content border-[2px] bg-neutral rounded-full w-[16px] aspect-square absolute z-[99999] hidden"
// />
