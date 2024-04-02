import React, {useEffect, useState} from "react";
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {query} from "../../async/async";
import {useDispatch} from "react-redux";
import {SkeletonBrick} from "@consta/uikit/Skeleton";
import {Link} from "react-router-dom";

export default function ServiceSlider(props)  {
    const [sliderArr, setSliderArr] = useState(null);
    const dispatch = useDispatch();

    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {
        let fd = new FormData();
        fd.append('url', window.location.pathname);
        query('/api/slider', fd)
            .then(resp=>resp.json())
            .then(res=>{
                if(res?.status === 'ok'){
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
            <section className="repairHead repairHead-service">
                <div className="container">
                    <Swiper slidesPerView={1} modules={[Pagination, Autoplay]} pagination={{clickable: true}} autoplay={{delay: 5000}}
                            className='repairHead-swiper'>
                        {
                            sliderArr && sliderArr?.length
                                ? sliderArr.map(slide => {
                                    return <SwiperSlide>
                                        {
                                            slide?.url
                                                ? slide.url === 'openmodal'
                                                    ? <img src={`/${slide.photo}`} onClick={()=>{dispatch({type: 'SET_REPAIR_RECORD_MODAL_OPEN', val: {isOpen: true}})}}/>
                                                    : slide.url_type
                                                        ? <a href={slide.url} target="_blank"><img src={`/${slide.photo}`}/></a>
                                                        : <Link to={slide.url}><img src={`/${slide.photo}`}/></Link>
                                                : <img src={`/${slide.photo}`}/>
                                        }
                                    </SwiperSlide>
                                })
                                : <>
                                    <SwiperSlide>
                                        <SkeletonBrick height={500}/>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <SkeletonBrick height={500}/>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <SkeletonBrick height={500}/>
                                    </SwiperSlide>
                                </>
                        }
                    </Swiper>
                </div>
            </section>
        );
    }
}
