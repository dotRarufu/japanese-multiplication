import { forwardRef, useEffect, useState } from 'react';

type Props = {
  isShaded?: boolean;
  shouldResetMarks: number;
};

// eslint-disable-next-line no-empty-pattern
const Intersection = forwardRef<HTMLDivElement, Props>(
  ({ shouldResetMarks, isShaded }, ref) => {
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
      shouldResetMarks && setClicked(false);
    }, [shouldResetMarks]);

    return (
      <div
        onClick={() => setClicked(true)}
        ref={ref}
        className={`cursor-pointer border-neutral-content border-[0.125em] rounded-full w-[1em] aspect-square absolute z-[99999] hidden ${
          clicked ? 'bg-success' : isShaded ? 'bg-primary' : 'bg-neutral'
        }`}
      />
    );
  }
);

export default Intersection;
