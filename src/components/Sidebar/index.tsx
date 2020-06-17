import React, { FC, useEffect, useState } from 'react';
import { Toolbar } from '../Toolbar';
import { Menu } from '../Menu';
import { Search } from '../Search';
import { BoardList } from '../BoardList';

interface ISidebar {
}

export const Sidebar: FC<ISidebar> = () => {
  const [isPinnedSidebar, setIsPinnedSidebar] = useState<boolean>(true);
  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    setIsHover(false);
  }, [isPinnedSidebar]);

  return (
    <>
      <div className={`sidebar__overlay ${!isPinnedSidebar && !isHover ? 'sidebar__overlay--unpinned' : ''}`} />
      <aside
        className={`sidebar ${!isPinnedSidebar && !isHover ? 'sidebar--unpinned' : ''}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="sidebar__inner">
          <div className="sidebar__toggler">
            <Menu
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
          <BoardList />
          <Toolbar />
        </div>
      </aside>
    </>

  );
};
