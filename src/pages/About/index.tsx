import React, { FC } from 'react';
import cn from 'classnames';
import { Header } from '@comp/Header';
import { Button } from '@comp/Button';
import { Link } from 'react-router-dom';
import { Video } from '@comp/Video';

interface IAboutFeature {
  title: string;
  videoSrc: string;
  iconSrc: string;
  isReversed?: boolean;
}
const AboutFeature: FC<IAboutFeature> = ({
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
        {/* <img src="/assets/svg/menu/square.svg" alt="icon" /> */}
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

const features = [{
  title: 'Boards',
  description: ['', ''],
  videoSrc: '/assets/videos/1.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Columns',
  description: ['', ''],
  videoSrc: '/assets/videos/2.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Headings',
  description: ['', ''],
  videoSrc: '/assets/videos/3.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Todos',
  description: ['', ''],
  videoSrc: '/assets/videos/4.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Work Status',
  description: ['', ''],
  videoSrc: '/assets/videos/5.mp4',
  iconSrc: '/assets/svg/menu/rounded-square-half-filled.svg',
}, {
  title: 'Sub Todos',
  description: ['', ''],
  videoSrc: '/assets/videos/6.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Board Color',
  description: ['', ''],
  videoSrc: '/assets/videos/7.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Column Color',
  description: ['', ''],
  videoSrc: '/assets/videos/8.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Heading Color',
  description: ['', ''],
  videoSrc: '/assets/videos/9.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Todo Color',
  description: ['', ''],
  videoSrc: '/assets/videos/10.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Sub Todo Color',
  description: ['', ''],
  videoSrc: '/assets/videos/11.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Board Icon',
  description: ['', ''],
  videoSrc: '/assets/videos/12.mp4',
  iconSrc: '/assets/svg/logo.svg',
}, {
  title: 'Card Style',
  description: ['', ''],
  videoSrc: '/assets/videos/13.mp4',
  iconSrc: '/assets/svg/menu/rect.svg',
}, {
  title: 'Minimize Column',
  description: ['', ''],
  videoSrc: '/assets/videos/14.mp4',
  iconSrc: '/assets/svg/menu/dash.svg',
}, {
  title: 'Minimize Heading',
  description: ['', ''],
  videoSrc: '/assets/videos/15.mp4',
  iconSrc: '/assets/svg/menu/dash.svg',
}, {
  title: 'Reverse Columns',
  description: ['', ''],
  videoSrc: '/assets/videos/16.mp4',
  iconSrc: '/assets/svg/menu/reverse.svg',
}, {
  title: 'Recycle Bin',
  description: ['', ''],
  videoSrc: '/assets/videos/17.mp4',
  iconSrc: '/assets/svg/menu/remove.svg',
}, {
  title: 'Boards Moving',
  description: ['', ''],
  videoSrc: '/assets/videos/18.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Columns Moving',
  description: ['', ''],
  videoSrc: '/assets/videos/19.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Headings Moving',
  description: ['', ''],
  videoSrc: '/assets/videos/20.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Todo Moving',
  description: ['', ''],
  videoSrc: '/assets/videos/21.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Sub Todo Moving',
  description: ['', ''],
  videoSrc: '/assets/videos/22.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Deadlines',
  description: ['', ''],
  videoSrc: '/assets/videos/23.mp4',
  iconSrc: '/assets/svg/calendar.svg',
}, {
  title: 'Archives',
  description: ['', ''],
  videoSrc: '/assets/videos/24.mp4',
  iconSrc: '/assets/svg/menu/archive.svg',
}, {
  title: 'Comments & Attachments',
  description: ['', ''],
  videoSrc: '/assets/videos/25.mp4',
  iconSrc: '/assets/svg/bubble.svg',
}, {
  title: 'Preview & Gallery',
  description: ['', ''],
  videoSrc: '/assets/videos/26.mp4',
  iconSrc: '/assets/svg/gallery.svg',
}, {
  title: 'MD Support',
  description: ['', ''],
  videoSrc: '/assets/videos/27.mp4',
  iconSrc: '/assets/svg/gallery.svg',
}, {
  title: 'Column Width',
  description: ['', ''],
  videoSrc: '/assets/videos/28.mp4',
  iconSrc: '/assets/svg/menu/edit.svg',
}, {
  title: 'Flexible Sidebar',
  description: ['', ''],
  videoSrc: '/assets/videos/29.mp4',
  iconSrc: '/assets/svg/menu/hide-sidebar.svg',
}, {
  title: 'Search',
  description: ['', ''],
  videoSrc: '/assets/videos/30.mp4',
  iconSrc: '/assets/svg/board/search.svg',
}];

export const About: FC = () => (
  <div className="about">
    <div className="about__block about__block--gray">
      <div className="about__wrapper">
        <Header />
        <div className="about__block-first">
          <h1>
            Vertically ordered checklists
          </h1>
          <div className="about__block-first-inner">
            <h5>
              Great for planning and organizing work, educational process.
              Write better.
              Think more clearly.
              Get organized.
              Try it yourself 👌
            </h5>
            <Link to="/auth/register" className="link">
              <Button type="button" style={{ width: 200 }}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="about__block">
      <div className="about__wrapper">
        <div className="about__block-second">
          <Video
            src="/assets/videos/21.mp4"
            style={{
              transform: 'translateY(-120px)',
            }}
          />
          <h2>Value & Goal of this tool 🚀</h2>
          <h3>
            Any planning is difficult to complete, especially if it involves a lot of tasks.
            A large number of people neglect planning and scheduling their tasks,
            goals, plans for the next day, week or even years.
            Be better than them and plan your time.
          </h3>
          <h3>
            Using the beautiful and intuitive interface,
            where there is nothing superfluous, it is very easy to organize your workspace for carrying out tasks.
            Try it yourself!
          </h3>
        </div>
      </div>
    </div>

    {features.map(({
      title, videoSrc, iconSrc, description,
    }, index) => (
      <AboutFeature
        key={title}
        title={title}
        videoSrc={videoSrc}
        iconSrc={iconSrc}
        isReversed={index % 2 === 0}
      >
        {description.map((row: string) => (<p key={row}>{row}</p>))}
      </AboutFeature>
    ))}

    <div className="about__block">
      <div className="about__wrapper">
        <div className="about__block-footer">
          <h2 style={{ fontSize: 60, letterSpacing: -2 }}>Write, plan, and get organized 😎</h2>
          <h3>One tool for everything you need.</h3>
          <Link to="/auth/register" className="link">
            <Button modificator="primary" type="button" style={{ width: 200, marginTop: 40 }}>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
    <div className="about__contacts">
      2021&nbsp;by&nbsp;
      <a href="https://github.com/xom9ikk" target="_blank">@xom9ikk</a>
    </div>
  </div>
);
