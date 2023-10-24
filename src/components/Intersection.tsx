import { forwardRef, useState } from 'react';

type Props = {
  isShaded?: boolean;
};

// eslint-disable-next-line no-empty-pattern
const Intersection = forwardRef<HTMLDivElement, Props>(({ isShaded }, ref) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      onClick={() => setClicked(true)}
      ref={ref}
      className={`cursor-pointer border-neutral-content border-[0.125em] rounded-full w-[1em] aspect-square absolute z-[99999] hidden ${
        clicked ? 'bg-success' : isShaded ? 'bg-primary' : 'bg-neutral'
      }`}
    />
  );
});

export default Intersection;
