import React, {
  CSSProperties, FC, useRef, useState,
} from 'react';
import { Waypoint } from 'react-waypoint';

interface IVideo {
  src: string;
  isAutoPlay?: boolean;
  style?: CSSProperties;
}

export const Video: FC<IVideo> = ({
  src,
  isAutoPlay = false,
  style,
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
        style={style}
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
