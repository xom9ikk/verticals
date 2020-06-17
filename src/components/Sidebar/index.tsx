import React, { FC, useEffect, useState } from 'react';
import { Toolbar } from '../Toolbar';
import { OpacityButton } from '../OpacityButton';
import { Search } from '../Search';
import { BoardList } from '../BoardList';

interface ISidebar {
}

export const Sidebar: FC<ISidebar> = () => {
  const [isPinnedSidebar, setIsPinnedSidebar] = useState<boolean>(true);
  const [isHover, setIsHover] = useState<boolean>(false);

  const classes = ['sidebar'];
  if (!isPinnedSidebar && !isHover) {
    classes.push('sidebar--unpinned');
  }

  useEffect(() => {
    setIsHover(false);
  }, [isPinnedSidebar]);

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
        <div>
          <div className="icon">icon</div>
          <BoardList />
        </div>
        <Toolbar />
      </div>
    </aside>
  );
};
