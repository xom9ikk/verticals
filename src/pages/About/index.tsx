/* eslint-disable max-len */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Video } from '@comp/Video';
import { Button } from '@comp/Button';
import { Header } from '@comp/Header';
import { AboutFeature } from '@comp/AboutFeature';

const features = [{
  title: 'Boards',
  description: [
    'Is the <b>main building block</b> of your planning. It can contain columns, headers, todo and sub todo internally.',
    'To reveal all the functionality of the boards, watch the video and description below.',
  ],
  videoSrc: '/assets/videos/1.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Columns',
  description: [
    'Columns can be used to <b>group whole task blocks</b>. Columns can contain todo or headers.',
    'To find out all the possibilities of the columns, check out our presentation below.',
  ],
  videoSrc: '/assets/videos/2.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Headings',
  description: [
    'Large lists make it very difficult to read. Use headings to avoid this. With their help, you can create a <b>certain structure.</b>',
    'For example, they can store categories, stage names, versioning, or something else...',
  ],
  videoSrc: '/assets/videos/3.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Todos',
  description: [
    'The <b>most common block</b> you will have to work with. This is a card that displays a task to complete.',
    'The additional features of the card are described below.',
  ],
  videoSrc: '/assets/videos/4.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Work Status',
  description: [
    'Verticals has more task states than many other similar products that only have <b>To Do</b> and <b>Done</b> statuses. With statuses, you can control the progress of each todo or sub todo.',
    'There are 4 statuses in total: <b>To do</b>, <b>Doing</b>, <b>Canceled</b>, <b>Done</b>.',
  ],
  videoSrc: '/assets/videos/5.mp4',
  iconSrc: '/assets/svg/menu/rounded-square-half-filled.svg',
}, {
  title: 'Sub Todos',
  description: [
    'These are a kind of subtasks that need to be completed in order to implement some kind of large task. Although it is recommended to store large tasks in a heading or even a column, sometimes this is not enough and sub todo comes to the rescue.',
    'You can use sub todo as a <b>checklist</b> for your task.',
  ],
  videoSrc: '/assets/videos/6.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Board Color',
  description: [
    'It\'s no secret that highlighting something with color helps in the <b>perception of information.</b>',
    'You can highlight the boards in any color you like to focus your attention on the board.',
  ],
  videoSrc: '/assets/videos/7.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Column Color',
  description: [
    'Columns can also be <b>highlighted with color</b>. The color is applied not to the entire column, but only to its top.',
    'Thus, it will not interfere and distract you when working with the content of the column.',
  ],
  videoSrc: '/assets/videos/8.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Heading Color',
  description: [
    'Like columns, headings also let you colorize themselves.',
    'For ease of use, only the <b>upper part of the header is marked with color</b>, so as not to take too much attention when working with tasks in the heading.',
  ],
  videoSrc: '/assets/videos/9.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Todo Color',
  description: [
    'Tasks can be colored in the same way as headings, this is convenient when, for example, you need to focus all your attention on completing a specific task.',
    'The colors are <b>not very saturated so as not to focus on the color only.</b>',
  ],
  videoSrc: '/assets/videos/10.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Sub Todo Color',
  description: [
    'Sub todo is a direct analogue of the todo discussed above, so the sub todo also has the <b>ability to use colors.</b>',
    'The colors are not very saturated so as not to focus on the color only.',
  ],
  videoSrc: '/assets/videos/11.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Board Icon',
  description: [
    'To improve the recognizability of the boards, we can highlight them in color, give them unique names, and change their positions. But nothing allows the eye to catch on like a <b>unique icon.</b> This is why there are icons for the boards.',
    'By default, they are the same, but if necessary, you can easily change the icon to your liking or choose the icon that best describes your board.',
  ],
  videoSrc: '/assets/videos/12.mp4',
  iconSrc: '/assets/svg/logo.svg',
}, {
  title: 'Card Style',
  description: [
    'We do not always need classic checkboxes to work with tasks. Sometimes we just have task lists that we just need to move between columns, headers. In this case, you can use a <b>different style of cards.</b>',
    'The card style is applied to all todo and sub todo related to this board.',
  ],
  videoSrc: '/assets/videos/13.mp4',
  iconSrc: '/assets/svg/menu/rect.svg',
}, {
  title: 'Minimize Column',
  description: [
    'For a cleaner, data-free user experience, you can <b>collapse the columns</b> you don\'t need at the moment. The collapsed column displays the name of the column and the number of tasks it contains.',
    'Collapsed columns are easier to reorder when changing positions.',
  ],
  videoSrc: '/assets/videos/14.mp4',
  iconSrc: '/assets/svg/menu/dash.svg',
}, {
  title: 'Minimize Heading',
  description: [
    'If you are not currently working on a specific heading and its content is not interesting to you right now, then you can <b>collapse</b> it so that it does not take up too much space.',
    'When collapsed, the title looks like a todo and displays the number of nested todo & heading title.',
  ],
  videoSrc: '/assets/videos/15.mp4',
  iconSrc: '/assets/svg/menu/dash.svg',
}, {
  title: 'Reverse Columns',
  description: [
    'Sometimes it can be useful to <b>invert the order of the columns</b> within the board. To do this, simply click the corresponding button in the context menu.',
    'To apply the reverse operation to reverse the column order, do this again.',
  ],
  videoSrc: '/assets/videos/16.mp4',
  iconSrc: '/assets/svg/menu/reverse.svg',
}, {
  title: 'Recycle Bin',
  description: [
    'When you delete a card, it is not permanently deleted, but transferred to the <b>Recycle Bin</b>. This is useful when you accidentally delete a card or after deleting you decide that you need it.',
    'Thus, all information on the card, including comments and attachments, can be restored in one click.',
  ],
  videoSrc: '/assets/videos/17.mp4',
  iconSrc: '/assets/svg/menu/remove.svg',
}, {
  title: 'Boards Moving',
  description: [
    'The required order of the boards does not always match the order in which we create them. In addition, priorities can sometimes change and some boards must go up in the list, or go down.',
    'To <b>change the order</b>, simply pinch and drag the board to the target position.',
  ],
  videoSrc: '/assets/videos/18.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Columns Moving',
  description: [
    'If you are using columns to track weekly sprints, you may not need to rearrange the columns. But if the contents of the columns have nothing in common and represent one large enough block of work, then <b>ordering the positions</b> can be very useful.',
    'Pinch the top of the column and drag the column to the target location.',
  ],
  videoSrc: '/assets/videos/19.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Headings Moving',
  description: [
    'Headings, like columns, can be dragged and dropped. Use this opportunity in order to correctly <b>prioritize tasks</b> and be as productive as possible in the process of working on a block of tasks.',
    'To move, you need to pinch down the top part of the header and drag it to the required position.',
  ],
  videoSrc: '/assets/videos/20.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Todo Moving',
  description: [
    'Tasks from time to time need to be <b>grouped and prioritized</b> to the top of the list. Priorities can change over time and therefore it is very important to be able to move tasks.',
    'Moving is available within a column, heading or even between them. Just click and drag the task to the desired location.',
  ],
  videoSrc: '/assets/videos/21.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Sub Todo Moving',
  description: [
    'The sub todo represents a small part of the path to completing a task. And the correct execution of subtasks can lead to the <b>completion of the task as a whole faster.</b>',
    'Therefore, changing the positions of subtasks from the checklist plays an important role in the process of planning approaches to solving a specific problem.',
  ],
  videoSrc: '/assets/videos/22.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Deadlines',
  description: [
    'It is not enough to simply set a task for yourself. If you do not estimate the timing of a task, then this task may not be completed for a long period of time. And in this case, the whole planning process comes to naught.',
    'Use a <b>smart calendar to select dates.</b> You can describe in simple words when the deadline comes and the date will be inserted automatically.',
  ],
  videoSrc: '/assets/videos/23.mp4',
  iconSrc: '/assets/svg/calendar.svg',
}, {
  title: 'Archives',
  description: [
    'Some tasks may lose priority, but you may still have to return to them after a certain period of time.',
    'In this case, it is better not to permanently delete the card or move it to the trash can. Instead, just <b>archive the card</b> and it will move to the archive list within the column.',
  ],
  videoSrc: '/assets/videos/24.mp4',
  iconSrc: '/assets/svg/menu/archive.svg',
}, {
  title: 'Comments & Attachments',
  description: [
    'For good and productive communication between team members, you need a place where the problem can be <b>discussed and add the necessary materials</b> to complete.',
    'These can be pictures, files of any extension, and text comments that support the Markdown format, which will be discussed below.',
  ],
  videoSrc: '/assets/videos/25.mp4',
  iconSrc: '/assets/svg/bubble.svg',
}, {
  title: 'Preview & Gallery',
  description: [
    'Cards allow you to attach comments to them, various files and pictures. And sometimes it is not very convenient to constantly open a popup with comments to the card in order to see all attachments.',
    'Using the function demonstrated in the video, you can instantly <b>view all attachments</b>, without having to open a popup of comments to the card.',
  ],
  videoSrc: '/assets/videos/26.mp4',
  iconSrc: '/assets/svg/gallery.svg',
}, {
  title: 'Markdown Support',
  description: [
    'Very often whiteboards are used by programmers who quite often have to deal with the Markdown format. Verticals supports this feature for comments. You can easily format your text, <b>insert pieces of code, draw tables,</b> and more.',
    'More information can be found on the popup with the help of text formatting.',
  ],
  videoSrc: '/assets/videos/27.mp4',
  iconSrc: '/assets/svg/board/rocket.svg',
}, {
  title: 'Column Width',
  description: [
    'If the names of the cards are very long, then the column width can be increased so as not to take up a lot of space in height and there is no need for additional scrolling.',
    'Just hover your cursor between the columns for a distinctive resize pointer and drag it to the <b>size you need to comfortably work with the column.</b>',
  ],
  videoSrc: '/assets/videos/28.mp4',
  iconSrc: '/assets/svg/menu/edit.svg',
}, {
  title: 'Flexible Sidebar',
  description: [
    'When working on a device with a low resolution, it is more correct to <b>use all the space to display what really matters.</b>',
    'Switching between boards and other functions that are located on the sidebar are not often used and therefore the sidebar can be hidden if necessary.',
  ],
  videoSrc: '/assets/videos/29.mp4',
  iconSrc: '/assets/svg/menu/hide-sidebar.svg',
}, {
  title: 'Search',
  description: [
    'For a convenient search by task names, you can use the search. All boards, columns, headings are searched at once. After searching, you can see <b>how many matches were found</b> for each board.',
    'Column, heading names and sub todo names are not included in the search results. Todo headers only.',
  ],
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
        {description.map((row: string) => (<p key={row} dangerouslySetInnerHTML={{ __html: row }} />))}
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
