import React, { FC, useEffect, useState } from 'react';
import { Menu } from '../Menu';
import { Toolbar } from '../Toolbar';

interface ISidebar {
}

export const Sidebar: FC<ISidebar> = ({ children }) => {
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
          <div className="sidebar__toggle">
            <Menu
              imageSrc={`/svg/${isPinnedSidebar ? 'hide' : 'show'}-sidebar.svg`}
              alt="add"
              imageSize={16}
              size={20}
              isHide
              isHoverBlock={isHover}
              isShowPopup={false}
              onClick={() => setIsPinnedSidebar((prev) => !prev)}
            />
          </div>
          {children}
          <Toolbar onChangeDisplaySidebar={setIsPinnedSidebar} />
        </div>
      </aside>
    </>

  );
};
