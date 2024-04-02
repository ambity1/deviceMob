import React, {useEffect, useState} from "react";
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Link} from "react-router-dom";
import {SkeletonBrick} from "@consta/uikit/Skeleton";
import {query} from "../../async/async";

function MainSlider(props)  {
    const [sliderArr, setSliderArr] = useState(null)
    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {
        let fd = new FormData();
        fd.append('url',window.location.pathname);
        query('/api/slider', fd)
            .then(resp=>resp.json())
            .then(res=>{
                if(res?.status == 'ok'){
                    if(res?.data?.length){
                        setSliderArr(res.data)
                        setIsEmpty(false)
                    }else{
                        setSliderArr(null)
                        setIsEmpty(true)
                    }
                }else{
                    setSliderArr(null)
                    setIsEmpty(true)
                }
            })
    }, []);

    if(isEmpty) {
        return(
            <></>
        );
    }else {
        return (
            <div className="banners">
                <div className="container">
                    <div className="banners-block d-flex">
                        <Swiper slidesPerView={1} modules={[Pagination, Autoplay]} pagination={{clickable: true}} autoplay={{delay: 5000}}
                                className='banners-swiper'>
                            {
                                sliderArr && sliderArr?.length
                                    ? sliderArr.map(slide => {
                                        return <SwiperSlide>
                                            {
                                                slide?.url
                                                    ? slide.url_type
                                                        ? <a href={slide.url} target="_blank"><img src={`/${slide.photo}`}/></a>
                                                        : <Link to={slide.url}><img src={`/${slide.photo}`}/></Link>
                                                : <img src={`/${slide.photo}`}/>
                                            }
                                        </SwiperSlide>
                                    })
                                    : <>
                                        <SwiperSlide>
                                            <SkeletonBrick height={300}/>
                                        </SwiperSlide>
                                    </>
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         arrSlides : state.mainSlider
//     };
// }

// export default connect(mapStateToProps)(MainSlider);
export default MainSlider;