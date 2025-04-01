import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Free from "../../assets/Free.png";
import T from "../../assets/T.png";
import H from "../../assets/H.png";
import R from "../../assets/R.png";

import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';


const ContentCarousel = () => {
    return (
        <div className='flex'>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination, Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className="mySwiper ้ h-80 object-cover rounded-md"
            >
                <SwiperSlide>
                    <img
                        className='w-full'
                        src={Free} />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className='w-full'
                        src={T} />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className='w-full'
                        src={H} />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className='w-full'
                        src={R} />
                </SwiperSlide>


            </Swiper>
        </div>
    )
}

export default ContentCarousel