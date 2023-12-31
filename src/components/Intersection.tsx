import { forwardRef, useEffect, useState } from 'react';

type Props = {
  isShaded?: boolean;
  shouldResetMarks: number;
  onClick: () => void;
};

// eslint-disable-next-line no-empty-pattern
const Intersection = forwardRef<HTMLDivElement, Props>(
  ({ shouldResetMarks, isShaded, onClick }, ref) => {
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
      shouldResetMarks && setClicked(false);
    }, [shouldResetMarks]);

    return (
      <div
        onClick={() => {
          setClicked(true);
          onClick();
        }}
        ref={ref}
        className={`cursor-pointer border-[0.125em] rounded-full w-[1em] aspect-square absolute z-[99999] hidden ${
          isShaded ? 'bg-primary' : 'bg-neutral'
        } ${clicked ? 'border-info' : 'border-neutral-content'}`}
      />
    );
  }
);

export default Intersection;
