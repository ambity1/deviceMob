import React from "react";
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function AboutSlider(props)  {

    return(
        <Swiper slidesPerView={1} modules={[Navigation, Pagination]} pagination={{ clickable: true }} className="about-swiper w-100">
            <SwiperSlide>
                <img src="/media/slider/AboutSlider/about_1.jpg"/>
            </SwiperSlide>
            <SwiperSlide>
                <img src="/media/slider/AboutSlider/about_2.jpg"/>
            </SwiperSlide>
            <SwiperSlide>
                <img src="/media/slider/AboutSlider/about_3.jpg"/>
            </SwiperSlide>
            <SwiperSlide>
                <img src="/media/slider/AboutSlider/about_4.jpg"/>
            </SwiperSlide>
            <SwiperSlide>
                <img src="/media/slider/AboutSlider/about_5.jpg"/>
            </SwiperSlide>
            <SwiperSlide>
                <img src="/media/slider/AboutSlider/about_6.jpg"/>
            </SwiperSlide>
        </Swiper>
    );
}

// function mapStateToProps(state) {
//     return {
//         arrSlides : state.mainSlider
//     };
// }

// export default connect(mapStateToProps)(MainSlider);
export default AboutSlider;