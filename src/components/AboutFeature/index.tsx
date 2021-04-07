import React, { FC } from 'react';
import cn from 'classnames';
import { Video } from '@comp/Video';

interface IAboutFeature {
  title: string;
  videoSrc: string;
  iconSrc: string;
  isReversed?: boolean;
}

export const AboutFeature: FC<IAboutFeature> = ({
  title,
  videoSrc,
  iconSrc,
  isReversed,
  children,
}) => (
  <div className="about__block about__block--bordered">
    <div className={cn('about__feature', {
      'about__feature--reversed': isReversed,
    })}
    >
      <div className="about__feature-info">
        <img src={iconSrc} alt="icon" />
        <div className="about__feature-title">
          {title}
        </div>
        {children}
      </div>
      <div className="about__feature-preview">
        <Video src={videoSrc} />
      </div>
    </div>
  </div>
);
