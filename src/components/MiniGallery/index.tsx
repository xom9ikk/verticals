import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useCollapse } from '@use/animationHeight';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SystemActions } from '@store/actions';
import { ICommentAttachments } from '@type/entities';

SwiperCore.use([Pagination]);

interface IMiniGallery {
  images: ICommentAttachments,
  width: number,
  isCollapse: boolean,
}

export const MiniGallery: FC<IMiniGallery> = ({
  images,
  width,
  isCollapse: initialIsCollapse,
}) => {
  const dispatch = useDispatch();
  const { collapse, expand } = useCollapse();
  const ref = useRef<any>();
  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [swiperController, setSwiperController] = useState<SwiperCore>();

  const handleClick = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    dispatch(SystemActions.setGalleryImagesInfo({
      images,
      index: activeIndex,
    }));
  };

  useEffect(() => {
    if (isCollapse) {
      collapse(ref.current, 300);
    } else {
      expand(ref.current, 300);
    }
  }, [isCollapse]);

  useEffect(() => {
    if (images && images.length) {
      const timeout = setTimeout(() => {
        swiperController?.slideReset();
        setIsCollapse(initialIsCollapse);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [initialIsCollapse, images]);

  useEffect(() => {
    swiperController?.update();
  }, [width]);

  const handleNext = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    swiperController?.slideNext();
  };

  const handlePrev = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    swiperController?.slidePrev();
  };

  const memoSwiper = useMemo(() => (images.length ? (
    <div className="mini-gallery__wrapper">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        preventClicks={false}
        threshold={2}
        loop
        setWrapperSize
        autoHeight
        pagination={{ type: 'fraction' }}
          // @ts-ignore
        style={{ '--mini-gallery-width': `${width}px` }}
        onSwiper={setSwiperController}
        onSlideChangeTransitionEnd={(swiper) => {
          const newActiveIndex = swiper.activeIndex - 1;
          setActiveIndex(newActiveIndex);
        }}
      >
        {
          images.map((image) => (
            <SwiperSlide key={image.path}>
              <img src={image.path} alt="" />
            </SwiperSlide>
          ))
        }
      </Swiper>
      <button className="swiper-button-prev" onClick={handlePrev} />
      <button className="swiper-button-next" onClick={handleNext} />
    </div>
  ) : null),
  [images, width, swiperController]);

  return (
    <div
      ref={ref}
      className={cn('mini-gallery', {
        'mini-gallery--opened': !isCollapse,
      })}
      onClick={handleClick}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      { memoSwiper }
    </div>
  );
};
