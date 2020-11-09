import React, { FC, useEffect, useRef } from 'react';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { useCollapse } from '@/use/animationHeight';

interface IMiniGallery {
  id?: number,
  isCollapse: boolean,
}
SwiperCore.use([Navigation, Pagination]);

const attachments = [{
  extension: 'png',
  name: 'a.png',
  path: 'https://images.unsplash.com/photo-1604813266338-eb804179fe83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://images.unsplash.com/photo-1604778368096-1ef9ada56c0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://images.unsplash.com/photo-1604542246839-5c3c6fb837fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=280',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://images.unsplash.com/photo-1604542246839-5c3c6fb837fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=280&h=2800',
}];

export const MiniGallery: FC<IMiniGallery> = ({
  isCollapse,
}) => {
  const { collapse, expand } = useCollapse();
  const ref = useRef<any>();

  useEffect(() => {
    if (isCollapse) {
      collapse(ref.current, 300);
    } else {
      expand(ref.current, 300);
    }
  }, [isCollapse]);

  return (
    <div
      ref={ref}
      className="mini-gallery"
      // className={`mini-gallery
  // ${isCollapse ? 'mini-gallery--collapse' : ''}`}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <div className="mini-gallery__wrapper">
        <Swiper
          slidesPerView={1}
          height={100}
          spaceBetween={4}
          loop
          setWrapperSize
          autoHeight
          navigation
          effect="flip"
          pagination={{ type: 'fraction' }}
        >
          {
              attachments.map((attachment) => (
                <SwiperSlide key={attachment.path}>
                  <img src={attachment.path} alt="" />
                </SwiperSlide>
              ))
            }
        </Swiper>
      </div>
    </div>
  );
};
