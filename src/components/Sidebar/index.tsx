import cn from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ControlButton } from '@comp/ControlButton';
import { Toolbar } from '@comp/Sidebar/Toolbar';

export const Sidebar: FC = ({
  children,
}) => {
  const { t } = useTranslation();
  const [isPinnedSidebar, setIsPinnedSidebar] = useState<boolean>(true);
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleSwitcherClick = () => setIsPinnedSidebar((prev) => !prev);

  useEffect(() => {
    setIsHover(false);
  }, [isPinnedSidebar]);

  const isUnpinned = !isPinnedSidebar && !isHover;

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sidebar__inner">
          <div className="sidebar__toggle">
            <ControlButton
              className="sidebar-button"
              imageSrc={`/assets/svg/${isPinnedSidebar ? 'hide' : 'show'}-sidebar.svg`}
              tooltip={`${isPinnedSidebar ? t('Hide sidebar') : t('Show sidebar')}`}
              alt="add"
              imageSize={16}
              size={20}
              isInvisible
              onClick={handleSwitcherClick}
            />
          </div>
          {children}
          <Toolbar onChangeDisplaySidebar={setIsPinnedSidebar} />
        </div>
      </aside>
    </>
  );
};
