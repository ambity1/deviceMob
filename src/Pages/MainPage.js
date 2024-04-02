import React, {useEffect} from 'react';

import Catalog from "../Components/catalog/Catalog";
import MainSlider from "../Components/sliders/MainSlider";
import AdditionalSlider from "../Components/sliders/AdditionalSlider";
import Service from "../Components/service/Service";
import Contacts from "../Components/Static/Contacts";
import About from "../Components/Static/About";

function MainPage(props){

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = 'DEVICE'
    }, [])

    return (
        <>
            <MainSlider/>
            <section className="favs">
                <div className="container">
                    <div className="d-flex favs-grid flex-column">
                        <div className="favs-item d-flex align-items-center">
                            <img src="/media/i/icon-super.svg" alt=""/>
                            <p>Ремонт смартфонов и другой техники с гарантией от 4 мес.</p>
                        </div>
                        <div className="favs-item d-flex align-items-center">
                            <img src="/media/i/icon-store.svg" alt=""/>
                            <p>6 магазинов и сервисных центров в Уфе</p>
                        </div>
                        <div className="favs-item d-flex align-items-center">
                            <img src="/media/i/icon-benefit.svg" alt=""/>
                            <p>Оригинальная техника Apple по выгодным ценам</p>
                        </div>
                    </div>
                </div>
            </section>
            <Catalog withHeader={true} headerTag='h2'/>
            <Service headerTag='h2' withHeader={true}/>
            <AdditionalSlider withHeader={true} headerText='Популярные товары' queryPath='/api/popProds'/>
            <AdditionalSlider withHeader={true} headerText='Лучшие предложения' queryPath='/api/bestDeals'/>
            <About/>
            <Contacts/>
        </>
    );
}

export default MainPage;