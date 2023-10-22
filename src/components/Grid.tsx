import { useState, useRef, useEffect } from 'react';
import isOverlapping from '../utils/isOverlapping';
import multiplyArrays from '../utils/multiplyArrays';
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
    verticals.current.forEach(v => {
      horizontals.current.forEach(h => {
        const isOverlap = isOverlapping(v!, h!, parentElem.current!);

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
      <div key={i1} className="flex gap-4 w-full justify-center ">
        {Array(digit)
          .fill('')
          .map((_, i2) => (
            <div
              key={i2}
              ref={element =>
                (verticals.current = [
                  ...[...verticals.current].filter(v => v !== null),
                  element,
                ])
              }
              className=" w-[0.25em] bg-success rounded-full h-full shadow-md  "
            />
          ))}
      </div>
    ));
  };

  const generateHorizontals = () => {
    horizontals.current = [];

    return question.x2.map((digit, i1) => (
      <div key={i1} className="flex gap-6 flex-col w-full  ">
        {Array(digit)
          .fill('')
          .map((_, i2) => (
            <div
              key={i2}
              ref={element =>
                (horizontals.current = [
                  ...[...horizontals.current].filter(v => v !== null),
                  element,
                ])
              }
              className=" h-[0.25em] bg-error rounded-full w-full shadow-md "
            />
          ))}
      </div>
    ));
  };

  const generateIntersections = () => {
    overlapElems.current = [];

    return Array(multiplyArrays(question.x1, question.x2))
      .fill('')
      .map((_, i) => (
        <Intersection
          key={i}
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
    <div className="p-4 w-full rounded-lg  bg-neutral/25">
      <div
        ref={parentElem}
        className="mx-auto aspect-square h-full max-w-[50vh] sm:max-w-[70vw]  relative"
      >
        {/* Intersections */}
        {generateIntersections()}

        {/* Verticals */}
        <div className=" overflow-hidden  px-2 gap-4 w-full h-full flex justify-around absolute left-0 top-0 ">
          {generateVerticals()}
        </div>

        {/* Horizontals */}
        <div className="py-2 w-full h-full flex flex-col gap-8 absolute left-0 top-0 justify-around">
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
