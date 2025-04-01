import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

const SwiperShowProduct = ({ children }) => {
    return (
        <Swiper
            slidesPerView={5}
            spaceBetween={10}
            pagination={true}
            navigation={true}
            modules={[Pagination, Autoplay, Navigation]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                280: {
                    
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 2,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 2,
                },
                1280: {
                    slidesPerView: 6,
                    spaceBetween: 2,
                },
                1400: {
                    slidesPerView: 7,
                    spaceBetween: 20,
                },
                1900: {
                    slidesPerView: 10,
                    spaceBetween: 20,
                },
            }}
            className='mySwiper object-cover rounded-md'
        >
            {children}

        </Swiper>
    )
}

export default SwiperShowProduct