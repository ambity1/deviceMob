import React, {useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function AssesoriesSlider(props)  {

    return(
        <div className="additional">
            <div className='position-relative d-flex align-items-center justify-content-center container'>
                <Swiper slidesPerView={'auto'} spaceBetween={10} breakpoints={{
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                        centeredSlides: false
                    },
                    820: {
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                        centeredSlides: false
                    },
                    1026: {
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                        centeredSlides: false
                    },
                    1430: {
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                        centeredSlides: false
                    },
                    1440: {
                        slidesPerView: 'auto',
                        spaceBetween: 30,
                        centeredSlides: false
                    }
                }} className='additional-swiper'>
                    <div>
                        <SwiperSlide className='d-flex align-items-center'>
                            <div className='d-flex flex-column'>
                                <div className="slide-photo">
                                    <div className="btn sale">Акция</div>
                                    <img src="/media/catalog/products/prod4.jpg" alt="Робот-пылесос Xiaomi Roborock Q7 Max, белый"/>
                                </div>
                                <div className="slide-desc d-flex flex-column flex-grow-1">
                                    <p>Робот-пылесос Xiaomi Roborock Q7 Max, белый</p>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="prices d-flex flex-column align-items-start">
                                            <span className="slide-price">29 990 ₽</span>
                                            <span className="slide-oldPrice">32 000</span>
                                        </div>
                                        <div className="slide-btn"><img src="/media/i/cart.svg"/></div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='d-flex align-items-center'>
                            <div className='d-flex flex-column'>
                                <div className="slide-photo">
                                    <div className="btn sale">Акция</div>
                                    <img src="/media/catalog/products/prod4.jpg" alt="Робот-пылесос Xiaomi Roborock Q7 Max, белый"/>
                                </div>
                                <div className="slide-desc d-flex flex-column flex-grow-1">
                                    <p>Робот-пылесос Xiaomi Roborock Q7 Max, белый</p>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="prices d-flex flex-column align-items-start">
                                            <span className="slide-price">29 990 ₽</span>
                                            <span className="slide-oldPrice">32 000</span>
                                        </div>
                                        <div className="slide-btn"><img src="/media/i/cart.svg"/></div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='d-flex align-items-center'>
                            <div className='d-flex flex-column'>
                                <div className="slide-photo">
                                    <div className="btn sale">Акция</div>
                                    <img src="/media/catalog/products/prod4.jpg" alt="Робот-пылесос Xiaomi Roborock Q7 Max, белый"/>
                                </div>
                                <div className="slide-desc d-flex flex-column flex-grow-1">
                                    <p>Робот-пылесос Xiaomi Roborock Q7 Max, белый</p>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="prices d-flex flex-column align-items-start">
                                            <span className="slide-price">29 990 ₽</span>
                                            <span className="slide-oldPrice">32 000</span>
                                        </div>
                                        <div className="slide-btn"><img src="/media/i/cart.svg"/></div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='d-flex align-items-center'>
                            <div className='d-flex flex-column'>
                                <div className="slide-photo">
                                    <div className="btn sale">Акция</div>
                                    <img src="/media/catalog/products/prod4.jpg" alt="Робот-пылесос Xiaomi Roborock Q7 Max, белый"/>
                                </div>
                                <div className="slide-desc d-flex flex-column flex-grow-1">
                                    <p>Робот-пылесос Xiaomi Roborock Q7 Max, белый</p>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="prices d-flex flex-column align-items-start">
                                            <span className="slide-price">29 990 ₽</span>
                                            <span className="slide-oldPrice">32 000</span>
                                        </div>
                                        <div className="slide-btn"><img src="/media/i/cart.svg"/></div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </div>
                </Swiper>
            </div>
        </div>
    );
}

// function mapStateToProps(state) {
//     return {
//         arrSlides : state.mainSlider
//     };
// }

// export default connect(mapStateToProps)(MainSlider);
export default AssesoriesSlider;