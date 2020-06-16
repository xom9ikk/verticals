import React, { FC, useEffect, useState } from 'react';
import { Toolbar } from '../Toolbar';
import { OpacityButton } from '../OpacityButton';
import { Search } from '../Search';

interface ISidebar {
}

export const Sidebar: FC<ISidebar> = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
  const [isPinnedSidebar, setIsPinnedSidebar] = useState<boolean>(true);
  const [isHover, setIsHover] = useState<boolean>(false);

  const classes = ['sidebar'];
  if (!isPinnedSidebar) {
    classes.push('sidebar--unpinned');
  }
  if (isHover && !isPinnedSidebar) {
    classes.push('sidebar--overlay');
  }

  useEffect(() => {
    setIsHover(false);
    // if (!isPinnedSidebar) {
    //   setIsHover(false);
    // }
  }, [isPinnedSidebar]);
  console.log(classes);
  return (
    <aside
      className={classes.join(' ')}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="sidebar__inner">
        <div className="sidebar__toggler">
          <OpacityButton
            imageSrc={`/svg/${isPinnedSidebar ? 'hide' : 'show'}-sidebar.svg`}
            alt="add"
            imageSize={16}
            size={20}
            isHide
            isHoverBlock={isHover}
            onClick={() => setIsPinnedSidebar((prev) => !prev)}
          />
        </div>
        <Search />
        <div className="container">
          <div className="boards-container">
            <div className="icon">icon</div>
            <div className="boards-list">
              <div className="board">1</div>
              <div className="board">2</div>
              <div className="board">3</div>
              <div className="board">4</div>
              <div className="board">5</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">6</div>
              <div className="board">last</div>
            </div>
          </div>
        </div>
        <Toolbar />

        {/* <div className="search">search</div> */}
        {/* <div className="toolbar">toolbar</div> */}
      </div>
    </aside>
  );
};
