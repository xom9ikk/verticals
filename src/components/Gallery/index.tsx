import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import SwiperCore, { Pagination, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CopyToClipboard from 'react-copy-to-clipboard';
import useKeys from '@rooks/use-keys';

import { ControlButton } from '@comp/ControlButton';
import { SystemActions } from '@store/actions';
import { getGalleryImagesInfo } from '@store/selectors';
import { useDownload } from '@use/download';
import { useTranslation } from 'react-i18next';

SwiperCore.use([Pagination, Keyboard]);

export const Gallery: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { images, index = 0 } = useSelector(getGalleryImagesInfo) || {};

  const [activeIndex, setActiveIndex] = useState<number>(index);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [swiperController, setSwiperController] = useState<SwiperCore>();

  const { download } = useDownload();

  const root: HTMLDivElement | null = document.querySelector('#root');

  const handleClose = () => {
    dispatch(SystemActions.setGalleryImagesInfo(null));
  };

  useKeys(['Escape'], handleClose);

  const handleDownload = () => {
    const link = images?.[activeIndex].path;
    if (link) {
      download(link);
    }
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handleNext = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    swiperController?.slideNext();
  };

  const handlePrev = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    swiperController?.slidePrev();
  };

  const setBlur = (value: number) => {
    root!.style.filter = `blur(${value}px)`;
  };

  useEffect(() => {
    setBlur(images?.length ? 5 : 0);
  }, [images]);

  useEffect(() => {
    swiperController?.slideTo(index + 1, 0, false);
  }, [images, index]);

  const memoSwiper = useMemo(() => (
    <div className="gallery__overlay" onClick={handleClose}>
      <div className="gallery__wrapper">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          threshold={2}
          keyboard
          setWrapperSize
          loop
          pagination={{ type: 'fraction' }}
          onSwiper={setSwiperController}
          onSlideChangeTransitionEnd={(swiper) => {
            const newActiveIndex = swiper.activeIndex - 1;
            setActiveIndex(newActiveIndex);
          }}
        >
          {
            images && images?.length > 0 && images.map((image) => (
              <SwiperSlide key={image.path}>
                <img src={image.path} alt={`${index + 1}`} />
              </SwiperSlide>
            ))
          }
        </Swiper>
        <button className="swiper-button-next" onClick={handleNext} />
        <button className="swiper-button-prev" onClick={handlePrev} />
      </div>
    </div>
  ), [images]);

  const gallery = (
    <div className={cn('gallery', {
      'gallery--is-open': images?.length,
    })}
    >
      <ControlButton
        imageSrc="/assets/svg/close.svg"
        alt="close"
        imageSize={16}
        size={32}
        style={{
          position: 'absolute',
          right: 16,
          top: 16,
          zIndex: 2,
        }}
        onClick={handleClose}
      />
      { memoSwiper }
      <div className="gallery__control">
        <div className="gallery__control-button">
          <ControlButton
            imageSrc="/assets/svg/download.svg"
            alt="download"
            imageSize={24}
            onClick={handleDownload}
            text={t('Download')}
            isMaxWidth
          />
        </div>
        <div className="gallery__control-button">
          <CopyToClipboard
            text={images?.[activeIndex]?.path || ''}
            onCopy={handleCopy}
          >
            <ControlButton
              imageSrc="/assets/svg/copy-link.svg"
              alt="copy"
              imageSize={24}
              text={isCopied ? t('Copied!') : t('Copy link')}
              isMaxWidth
            />
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );

  return createPortal(gallery, document.querySelector('#gallery-root')!);
};
