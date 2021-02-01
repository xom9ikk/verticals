import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { createPortal } from 'react-dom';

import SwiperCore, { Pagination, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// import 'swiper/swiper.scss';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getGalleryImagesInfo } from '@/store/selectors';
import { SystemActions } from '@/store/actions';
import { ControlButton } from '@comp/ControlButton';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDownload } from '@/use/download';

SwiperCore.use([Pagination, Keyboard]);

interface IGallery {
}

export const Gallery: FC<IGallery> = () => {
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

  const classes = ['gallery'];
  if (images?.length) {
    setBlur(5);
    classes.push('gallery--is-open');
    document.body.onkeydown = (e) => {
      if (e.code === 'Escape') {
        handleClose();
      }
    };
  } else {
    setBlur(0);
    document.body.onkeydown = null;
  }

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
    <div className={classes.join(' ')}>
      <ControlButton
        imageSrc="/assets/svg/close.svg"
        alt="close"
        imageSize={26}
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
            text="Download"
            isMaxWidth
            isHoverBlock
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
              text={isCopied ? 'Copied!' : 'Copy link'}
              isMaxWidth
              isHoverBlock
            />
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );

  return createPortal(gallery, document.querySelector('#gallery-root')!);
};
