import { useState } from 'react';

export const useHover = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return {
    isHovering,
    hoveringProps: {
      onMouseOver: () => {
        setIsHovering(true);
      },
      onMouseOut: () => {
        setIsHovering(false);
      },
    },
  };
};
