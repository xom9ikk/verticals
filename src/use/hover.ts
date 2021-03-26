import { useState } from 'react';

export const useHover = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return {
    isHovering,
    hoveringProps: {
      // onMouseEnter: () => {
      //   setIsHovering(true);
      // },
      // onMouseLeave: () => {
      //   console.log('onMouseLeave', false);
      //   setIsHovering(false);
      // },
      onMouseOver: () => {
        // console.log('onMouseLeave', true);
        setIsHovering(true);
      },
      onMouseOut: () => {
        // console.log('onMouseOut', false);
        setIsHovering(false);
      },
      // onMouseOutCapture: () => {
      //   console.log('onMouseOutCapture', false);
      //   setIsHovering(false);
      // },
    },
  };
};
