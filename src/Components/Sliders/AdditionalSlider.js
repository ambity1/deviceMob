import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {query} from "../../async/async";
import {Link} from "react-router-dom";
import {SkeletonBrick} from "@consta/uikit/Skeleton";
import {connect} from "react-redux";
import {changeCart} from "../../store/actions/cart/cart";

function AdditionalSlider(props)  {

    const [products, setProducts] = useState(null);

    const [isLoaded, setIsLoaded] = useState(false);

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let fd = new FormData();

        query(props.queryPath, fd).then(res=>res.json())
            .then(result => {
                if(result?.status == 'ok'){
                    setProducts(result?.data);
                    if(result?.data?.length){
                        setIsVisible(true);
                    }else{
                        setIsVisible(true);
                    }
                    setIsLoaded(true);
                }else{
                    setIsVisible(false);
                    setIsLoaded(true);
                }
            })
    }, []);

    return(
        isVisible
            ? <section className="additional">
                <div className="container">
                    {
                        props?.withHeader
                            ? <h2>{props.headerText ?? 'Ещё товары'}</h2>
                            : false
                    }
                </div>
                <div className='position-relative d-flex align-items-center justify-content-center'>
                    <div className="container">
                        <Swiper slidesPerView={'auto'}
                                spaceBetween={10}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 'auto',
                                        spaceBetween: 20,
                                        centeredSlides: false
                                    },
                                }} className='additional-swiper'>
                            <div>
                                {isLoaded && products?.length
                                    ? <>
                                        {
                                            products.map(product=>{
                                                let inCart = props.cart.findIndex(item=>item.alias === product.alias);
                                                return <SwiperSlide className='d-flex align-items-center'>
                                                    <div className='d-flex flex-column'>
                                                        <Link to={`/product/${product.alias}`}>
                                                            <div className="slide-photo">
                                                                {/*<div className="btn sale">Акция</div>*/}
                                                                <img src={product.image[0]} alt={product.label}/>
                                                            </div>
                                                            <div className="slide-desc d-flex flex-column flex-grow-1">
                                                                <p>{product.label}</p>
                                                            </div>
                                                        </Link>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="prices d-flex flex-column align-items-start">
                                                                <span className="slide-price">{product.price} ₽</span>
                                                                <span className="slide-oldPrice">{product.old_price ?? ''}</span>
                                                            </div>
                                                            {
                                                                inCart !==-1
                                                                    ? <div className="quantityBlock d-flex align-items-center justify-content-end">
                                                                        <div className="minus" onClick={()=>{props.changeCart(product, 'remove')}}/>
                                                                        <span className="count">{props.cart[inCart].quantity}</span>
                                                                        <div className="plus" onClick={()=>{props.changeCart(product, 'add')}}/>
                                                                    </div>
                                                                    : <div className="slide-btn" onClick={()=>{props.changeCart(product, 'add')}}><img src="/media/i/cart.svg"/></div>
                                                            }
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            })
                                        }
                                    </>
                                    : <>
                                        <SwiperSlide>
                                            <SkeletonBrick height={390}/>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SkeletonBrick height={390}/>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SkeletonBrick height={390}/>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SkeletonBrick height={390}/>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SkeletonBrick height={390}/>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SkeletonBrick height={390}/>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SkeletonBrick height={390}/>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SkeletonBrick height={390}/>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SkeletonBrick height={390}/>
                                        </SwiperSlide>
                                    </>
                                }
                            </div>
                        </Swiper>
                    </div>
                </div>
            </section>
            : <></>
    );
}

function mapStateToProps(state) {
    return {
        cart : state.cart.cart
    };
}

function mapDispatchToProps (dispatch) {
    return {
        changeCart: (prod, dir) => dispatch(changeCart(prod, dir)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalSlider);