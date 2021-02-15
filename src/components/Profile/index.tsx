import React, { FC, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Menu } from '@comp/Menu';
import { Avatar } from '@comp/Avatar';
import { Divider } from '@comp/Divider';
import { MenuItem } from '@comp/MenuItem';
import { ControlButton } from '@comp/ControlButton';
import { SystemActions } from '@store/actions';
import { redirectTo } from '@router/history';
import { getFullName, getIsOpenProfile, getUsername } from '@store/selectors';
import { useHover } from '@use/hover';

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

  const { isHovering, hoveringProps } = useHover();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
  };

  const handleClose = () => {
    dispatch(SystemActions.setIsOpenProfile(false));
  };

  const handleMenuButtonClick = (action: EnumMenuActions) => {
    switch (action) {
      case EnumMenuActions.OpenProfile: {
        dispatch(SystemActions.setIsOpenProfile(!isOpenProfile));
        break;
      }
      case EnumMenuActions.ProfileSettings: {
        redirectTo('/settings/profile');
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
      imageSize={16}
      size={32}
      style={{
        position: 'absolute',
        right: 10,
        top: 10,
      }}
      onClick={handleClose}
    />
    <Avatar size={180} />
    <h1 className="profile__popup-title">{fullName}</h1>
    <h4 className="profile__popup-subtitle">
      @
      {username}
    </h4>
  </div>
  ), [isOpenProfile]);

  return (
    <div
      className="profile"
      {...hoveringProps}
    >
      <Avatar
        onClick={() => {
          handleMenuButtonClick(EnumMenuActions.OpenProfile);
        }}
      />
      <Menu
        imageSrc="/assets/svg/dots.svg"
        alt="add"
        imageSize={22}
        size={24}
        isInvisible
        isHoverBlock={isHovering}
        position="bottom"
        isAbsolute={false}
      >
        <MenuItem
          text="My Profile"
          imageSrc="/assets/svg/menu/my-profile.svg"
          onClick={() => {
            handleMenuButtonClick(EnumMenuActions.OpenProfile);
          }}
        />
        <MenuItem
          text="Profile Settings"
          imageSrc="/assets/svg/menu/profile-settings.svg"
          onClick={() => {
            handleMenuButtonClick(EnumMenuActions.ProfileSettings);
          }}
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuItem
          text="Add board"
          imageSrc="/assets/svg/menu/add-board.svg"
          hintText="N"
          onClick={() => {
            handleMenuButtonClick(EnumMenuActions.AddBoard);
          }}
        />
        <CopyToClipboard
          text={`verticals.xom9ik.com/${username}`} // TODO: move to env
          onCopy={() => {
            handleMenuButtonClick(EnumMenuActions.CopyLink);
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
