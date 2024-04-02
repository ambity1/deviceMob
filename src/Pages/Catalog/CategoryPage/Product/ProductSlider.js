import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper';

const ProductSlider = (props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper modules={[Thumbs]} thumbs={{ swiper: thumbsSwiper }} className='prodSwiper'>
                {
                    props.photos
                    ? props.photos.map(image=>{
                        return <SwiperSlide>
                            <img src={`/${image}`} alt=""/>
                        </SwiperSlide>
                    })
                    : false
                }
            </Swiper>
            <Swiper modules={[Thumbs]} watchSlidesProgress onSwiper={setThumbsSwiper} className='prodSwiperThumb w-100' spaceBetween={10}>
                {
                    props.photos
                        ? props.photos.map(image=>{
                            return <SwiperSlide>
                                <img src={`/${image}`} alt=""/>
                            </SwiperSlide>
                        })
                        : false
                }
            </Swiper>
        </>
    )
}

export default ProductSlider;