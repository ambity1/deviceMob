import React from "react";
import AboutSlider from "../sliders/AboutSlider";
import {Link} from "react-router-dom";

export default function About(props) {
    return (
        <section className="about">
            <div className="container">
                <div className="about-block d-flex flex-column">
                    <div className="about-block-desc d-flex flex-column">
                        <h3>DEVICE - интернет магазин техники и крупный сервисный центр в Уфе</h3>
                        <p>Широкий выбор гаджетов, гарантия надежности, безупречное качество товара, скорость и результат обслуживания в сервисном центре</p>
                        <Link to='/about' className="btn">Подробнее</Link>
                    </div>
                    <AboutSlider/>
                </div>
            </div>
        </section>
    );
}