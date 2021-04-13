import React, { FC, useMemo, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@comp/Avatar';
import { ControlButton } from '@comp/ControlButton';
import { Divider } from '@comp/Divider';
import { Menu } from '@comp/Menu';
import { MenuItem } from '@comp/Menu/Item';
import { redirectTo } from '@router/history';
import { SystemActions } from '@store/actions';
import { getFullName, getIsOpenProfile, getUsername } from '@store/selectors';

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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpenProfile = useSelector(getIsOpenProfile);
  const fullName = useSelector(getFullName);
  const username = useSelector(getUsername);

  const [isCopied, setIsCopied] = useState<boolean>(false);

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
          dispatch(SystemActions.setActivePopupId(null));
        }, 1000);
        break;
      }
      default: break;
    }
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
    <div className="profile">
      <Avatar
        onClick={() => {
          handleMenuButtonClick(EnumMenuActions.OpenProfile);
        }}
      />
      <Menu
        id="profile"
        imageSrc="/assets/svg/dots.svg"
        alt="add"
        imageSize={22}
        size={24}
        isInvisible
        position="bottom"
        isAbsolute={false}
        onSelect={handleMenuButtonClick}
      >
        <MenuItem
          text={t('My Profile')}
          imageSrc="/assets/svg/menu/my-profile.svg"
          action={EnumMenuActions.OpenProfile}
        />
        <MenuItem
          text={t('Profile Settings')}
          imageSrc="/assets/svg/menu/profile-settings.svg"
          action={EnumMenuActions.ProfileSettings}
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuItem
          text={t('Add board')}
          imageSrc="/assets/svg/menu/add-board.svg"
          hintText="N"
          action={EnumMenuActions.AddBoard}
        />
        <CopyToClipboard
          text={`verticals.xom9ik.com/${username}`} // TODO: move to env
          onCopy={() => {
            handleMenuButtonClick(EnumMenuActions.CopyLink);
          }}
        >
          <MenuItem
            text={isCopied ? t('Copied!') : t('Copy link')}
            imageSrc="/assets/svg/menu/copy-link.svg"
            isAutoClose={false}
          />
        </CopyToClipboard>
      </Menu>
      { profile }
    </div>
  );
};
