import React, { FC } from 'react';
import { Header } from '@comp/Header';
import { Button } from '@comp/Button';
import { Link } from 'react-router-dom';

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
          <video autoPlay loop>
            <source
              src=""
              type="video/mp4"
            />
          </video>
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
    <div className="about__block about__block--bordered">
      <div className="about__wrapper">
        <div className="about__feature">
          <div className="about__feature-info">
            <img src="/assets/svg/menu/square.svg" alt="icon" />
            <div className="about__feature-title">
              Lorem ipsum
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Adipisci aut doloremque dolores ipsa iste nesciunt nihil placeat porro quod sit!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, vitae.
            </p>
          </div>
          <div className="about__feature-preview">
            <img src="" alt="preview" />
          </div>
        </div>
      </div>
    </div>
    <div className="about__block about__block--bordered">
      <div className="about__wrapper">
        <div className="about__feature about__feature--reversed">
          <div className="about__feature-info">
            <img src="/assets/svg/menu/square.svg" alt="icon" />
            <div className="about__feature-title">
              Lorem ipsum
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Adipisci aut doloremque dolores ipsa iste nesciunt nihil placeat porro quod sit!

            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, excepturi.
            </p>
          </div>
          <div className="about__feature-preview">
            <img src="" alt="preview" />
          </div>
        </div>
      </div>
    </div>
    <div className="about__block about__block--bordered">
      <div className="about__wrapper">
        <div className="about__feature">
          <div className="about__feature-info">
            <img src="/assets/svg/menu/square.svg" alt="icon" />
            <div className="about__feature-title">
              Lorem ipsum
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Adipisci aut doloremque dolores ipsa iste nesciunt nihil placeat porro quod sit!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, est.
            </p>
          </div>
          <div className="about__feature-preview">
            <img src="" alt="preview" />
          </div>
        </div>
      </div>
    </div>
    <div className="about__block about__block--bordered">
      <div className="about__wrapper">
        <div className="about__feature about__feature--reversed">
          <div className="about__feature-info">
            <img src="/assets/svg/menu/square.svg" alt="icon" />
            <div className="about__feature-title">
              Lorem ipsum
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Adipisci aut doloremque dolores ipsa iste nesciunt nihil placeat porro quod sit!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, tenetur.
            </p>
          </div>
          <div className="about__feature-preview">
            <img src="" alt="preview" />
          </div>
        </div>
      </div>
    </div>
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
