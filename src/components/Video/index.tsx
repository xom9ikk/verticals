import React, {
  FC, useRef, useState,
} from 'react';
import { Waypoint } from 'react-waypoint';

interface IVideo {
  src: string;
  isAutoPlay?: boolean;
}

export const Video: FC<IVideo> = ({
  src,
  isAutoPlay = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isFirstEntered, setIsFirstEntered] = useState<boolean>(false);

  const handleWaypointEnter = () => {
    setIsFirstEntered(true);
    requestAnimationFrame(() => videoRef.current?.play());
  };

  const handleWaypointLeave = () => {
    requestAnimationFrame(() => videoRef.current?.pause());
  };

  return (
    <Waypoint
      onEnter={handleWaypointEnter}
      onLeave={handleWaypointLeave}
    >
      <video
        className="video"
        ref={videoRef}
        muted
        autoPlay={isAutoPlay}
        loop
      >
        {isFirstEntered && (
          <source
            src={src}
            type="video/mp4"
          />
        )}
      </video>
    </Waypoint>

  );
};
