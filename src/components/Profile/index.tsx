import React, { FC, useMemo, useState } from 'react';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Menu } from '@comp/Menu';
import { MenuItem } from '@comp/MenuItem';
import { Divider } from '@comp/Divider';
import { Avatar } from '@comp/Avatar';
import { SystemActions } from '@/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { forwardTo } from '@/router/history';
import { getFullName, getIsOpenProfile, getUsername } from '@/store/selectors';
import { ControlButton } from '@comp/ControlButton';

enum EnumMenuActions {
  OpenProfile,
  ProfileSettings,
  AddBoard,
  CopyLink,
}

interface IProfile {
  onAddNewBoard: () => void;
}

export const Profile: FC<IProfile> = ({
  onAddNewBoard,
}) => {
  const dispatch = useDispatch();
  const isOpenProfile = useSelector(getIsOpenProfile);
  const fullName = useSelector(getFullName);
  const username = useSelector(getUsername);

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
  };

  const closeHandler = () => {
    dispatch(SystemActions.setIsOpenProfile(false));
  };

  const menuButtonClickHandler = (action: EnumMenuActions) => {
    switch (action) {
      case EnumMenuActions.OpenProfile: {
        dispatch(SystemActions.setIsOpenProfile(!isOpenProfile));
        break;
      }
      case EnumMenuActions.ProfileSettings: {
        forwardTo('/settings/profile');
        break;
      }
      case EnumMenuActions.AddBoard: {
        onAddNewBoard();
        break;
      }
      case EnumMenuActions.CopyLink: {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
          hidePopup();
        }, 1000);
        return;
      }
      default: break;
    }
    hidePopup();
  };

  const profile = useMemo(() => isOpenProfile && (
  <div className="profile__popup">
    <ControlButton
      imageSrc="/assets/svg/close.svg"
      alt="close"
      imageSize={24}
      size={30}
      style={{
        position: 'absolute',
        right: 10,
        top: 10,
      }}
      onClick={closeHandler}
    />
    <Avatar
      size={180}
    />
    <h1 className="profile__popup-title">{fullName}</h1>
    <h4 className="profile__popup-subtitle">
      @
      {username}
    </h4>
  </div>
  ), [isOpenProfile]);

  console.log('isCopied', isCopied);

  return (
    <div
      className="profile"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <Avatar
        onClick={() => {
          menuButtonClickHandler(EnumMenuActions.OpenProfile);
        }}
      />
      <Menu
        imageSrc="/assets/svg/dots.svg"
        alt="add"
        imageSize={22}
        size={24}
        isHoverBlock={isHover}
        position="bottom"
        isAbsolute={false}
      >
        <MenuItem
          text="My Profile"
          imageSrc="/assets/svg/menu/my-profile.svg"
          onClick={() => {
            menuButtonClickHandler(EnumMenuActions.OpenProfile);
          }}
        />
        <MenuItem
          text="Profile Settings"
          imageSrc="/assets/svg/menu/profile-settings.svg"
          onClick={() => {
            menuButtonClickHandler(EnumMenuActions.ProfileSettings);
          }}
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuItem
          text="Add board"
          imageSrc="/assets/svg/menu/add-board.svg"
          hintText="N"
          onClick={() => {
            menuButtonClickHandler(EnumMenuActions.AddBoard);
          }}
        />
        <CopyToClipboard
          text={`verticals.xom9ik.com/${username}`} // TODO move to env
          onCopy={() => {
            menuButtonClickHandler(EnumMenuActions.CopyLink);
          }}
        >
          <MenuItem
            text={isCopied ? 'Copied!' : 'Copy link'}
            imageSrc="/assets/svg/menu/copy-link.svg"
          />
        </CopyToClipboard>
      </Menu>
      { profile }
    </div>
  );
};
