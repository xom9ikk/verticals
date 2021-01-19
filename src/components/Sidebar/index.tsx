import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Toolbar } from '@comp/Toolbar';
import { ControlButton } from '@comp/ControlButton';

interface ISidebar {
}

export const Sidebar: FC<ISidebar> = ({ children }) => {
  const [isPinnedSidebar, setIsPinnedSidebar] = useState<boolean>(true);
  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    setIsHover(false);
  }, [isPinnedSidebar]);

  const isUnpinned = !isPinnedSidebar && !isHover;

  return (
    <>
      <div className={cn('sidebar__overlay', {
        'sidebar__overlay--unpinned': isUnpinned,
      })}
      />
      <aside
        className={cn('sidebar', {
          'sidebar--unpinned': isUnpinned,
        })}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="sidebar__inner">
          <div className="sidebar__toggle">
            <ControlButton
              imageSrc={`/assets/svg/${isPinnedSidebar ? 'hide' : 'show'}-sidebar.svg`}
              tooltip={`${isPinnedSidebar ? 'Hide sidebar' : 'Show sidebar'}`}
              alt="add"
              imageSize={16}
              size={20}
              isInvisible
              isHoverBlock={isHover}
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
