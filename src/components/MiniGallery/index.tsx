import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';

import { useDispatch } from 'react-redux';
import { getCommentImageAttachmentsByTodoId } from '@store/selectors';
import { useCollapse } from '@use/animationHeight';

import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// import 'swiper/swiper.scss';
// import 'swiper/components/pagination/pagination.scss';
import { SystemActions } from '@store/actions';
import { useParamSelector } from '@use/paramSelector';

SwiperCore.use([Pagination]);

interface IMiniGallery {
  todoId?: number,
  isCollapse: boolean,
}

export const MiniGallery: FC<IMiniGallery> = ({
  todoId,
  isCollapse: initialIsCollapse,
}) => {
  const dispatch = useDispatch();
  const { collapse, expand } = useCollapse();
  const ref = useRef<any>();
  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [swiperController, setSwiperController] = useState<SwiperCore>();

  const images = useParamSelector(getCommentImageAttachmentsByTodoId, todoId || null);

  const handleClick = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    console.log('handleClick activeIndex', activeIndex);
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
        setIsCollapse(initialIsCollapse);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [initialIsCollapse, images]);

  const handleNext = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    swiperController?.slideNext();
  };

  const handlePrev = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    swiperController?.slidePrev();
  };

  const memoSwiper = useMemo(() => (images && images.length ? (
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
        onSwiper={setSwiperController}
        onSlideChangeTransitionEnd={(swiper) => {
          const newActiveIndex = swiper.activeIndex - 1;
          console.log('newActiveIndex', newActiveIndex);
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
  [images]);

  return (
    <div
      ref={ref}
      className="mini-gallery"
      onClick={handleClick}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      { memoSwiper }
    </div>
  );
};
