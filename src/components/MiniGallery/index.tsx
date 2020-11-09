import React, {
  FC, useEffect, useRef, useState,
} from 'react';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { useCollapse } from '@/use/animationHeight';
import { useSelector } from 'react-redux';
import { getCommentImageAttachmentsByTodoId } from '@/store/selectors';

SwiperCore.use([Navigation, Pagination]);

interface IMiniGallery {
  todoId?: number,
  isCollapse: boolean,
}

export const MiniGallery: FC<IMiniGallery> = ({
  todoId = null,
  isCollapse: initialIsCollapse,
}) => {
  const { collapse, expand } = useCollapse();
  const ref = useRef<any>();
  const [isCollapse, setIsCollapse] = useState<boolean>(true);

  const images = useSelector(getCommentImageAttachmentsByTodoId(todoId));

  useEffect(() => {
    if (isCollapse) {
      collapse(ref.current, 300);
    } else {
      expand(ref.current, 300);
    }
  }, [isCollapse]);

  useEffect(() => {
    if (images && images.length) {
      setTimeout(() => {
        setIsCollapse(initialIsCollapse);
      }, 100);
    }
  }, [initialIsCollapse, images]);

  return (
    <div
      ref={ref}
      className="mini-gallery"
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      { images && images.length ? (
        <div className="mini-gallery__wrapper">
          <Swiper
            slidesPerView={1}
            height={100}
            spaceBetween={0}
            loop
            setWrapperSize
            autoHeight
            navigation
            pagination={{ type: 'fraction' }}
          >
            {
              images.map((image) => (
                <SwiperSlide key={image.path}>
                  <img src={image.path} alt="" />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      ) : null}
    </div>
  );
};
