import React, {useEffect, useState} from 'react';
import Service from "../../Components/service/Service";
import ServiceSlider from "../../Components/sliders/ServiceSlider";
import About from "../../Components/Static/About";
import Contacts from "../../Components/Static/Contacts";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import ServiceOffer from "../../Components/Static/ServiceOffer";

function ServicePage(props){
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Breadcrumbs url={window.location.pathname.slice(1)} type='breadcrumbs/page/'/>
            <ServiceSlider/>
            <section className="favs">
                <div className="container">
                    <div className="favs-grid favs-repair">
                        <div className="favs-item d-flex align-items-center">
                            <img src="/media/i/time.svg" alt=""/>
                            <p>Быстрый ремонт вашего смартфона</p>
                        </div>
                        <div className="favs-item d-flex align-items-center">
                            <img src="/media/i/six.svg" alt=""/>
                            <p>Все запчасти всегда в наличии</p>
                        </div>
                        <div className="favs-item d-flex align-items-center">
                            <img src="/media/i/approve.svg" alt=""/>
                            <p>Гарантия на все работы</p>
                        </div>
                    </div>
                </div>
            </section>
            <Service headerTag='h2' withHeader={true}/>
            <ServiceOffer/>
            <About/>
            <Contacts/>
        </>
    );
}

export default ServicePage;