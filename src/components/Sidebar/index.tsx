import React, { FC, useEffect, useState } from 'react';
import { Menu } from '@comp/Menu';
import { Toolbar } from '@comp/Toolbar';

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
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        <div className="sidebar__inner">
          <div className="sidebar__toggle">
            <Menu
              imageSrc={`/assets/svg/${isPinnedSidebar ? 'hide' : 'show'}-sidebar.svg`}
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
