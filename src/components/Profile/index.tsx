import React, { FC, useState } from 'react';
import { Menu } from '@comp/Menu';
import { MenuButton } from '@comp/MenuButton';
import { Divider } from '@comp/Divider';
import { Avatar } from '@comp/Avatar';
import { SystemActions } from '@/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store/reducers/state';

enum EnumMenuActions {
  OpenProfile,
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
  const { system: { isOpenProfile } } = useSelector((state: IRootState) => state);

  const [isHover, setIsHover] = useState<boolean>(false);

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
  };

  const closeHandler = () => {
    dispatch(SystemActions.setIsOpenProfile(false));
  };

  const menuButtonClickHandler = (action: EnumMenuActions) => {
    switch (action) {
      case EnumMenuActions.OpenProfile: {
        dispatch(SystemActions.setIsOpenProfile(true));
        break;
      }
      case EnumMenuActions.AddBoard: {
        onAddNewBoard();
        break;
      }
      case EnumMenuActions.CopyLink: {
        console.log('copy', 'https://');
        break;
      }
      default: break;
    }
    hidePopup();
  };

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
        <MenuButton
          text="My Profile"
          imageSrc="/assets/svg/menu/my-profile.svg"
          onClick={() => {
            menuButtonClickHandler(EnumMenuActions.OpenProfile);
          }}
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuButton
          text="Add board"
          imageSrc="/assets/svg/menu/add-board.svg"
          hintText="N"
          onClick={() => {
            menuButtonClickHandler(EnumMenuActions.AddBoard);
          }}
        />
        <MenuButton
          text="Copy link"
          imageSrc="/assets/svg/menu/copy-link.svg"
          onClick={() => {
            menuButtonClickHandler(EnumMenuActions.CopyLink);
          }}
        />
      </Menu>
      {
        isOpenProfile && (
        <div className="profile__popup">
          <Menu
            imageSrc="/assets/svg/close.svg"
            alt="close"
            imageSize={24}
            size={30}
            isShowPopup={false}
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
          <h1 className="profile__popup-title">Max Romanyuta</h1>
          <h4 className="profile__popup-subtitle">@xom9ik</h4>
        </div>
        )
      }

    </div>
  );
};
