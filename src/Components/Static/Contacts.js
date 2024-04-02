import React, {useEffect} from "react";
import {useSelector} from "react-redux";

export default function Contacts(props) {
    const contacts = useSelector(state => state.contacts);

    useEffect(()=>{
        if(props?.scrollTop){
            window.scrollTo(0, 0);
            document.title = 'DEVICE | Контакты';
        }
    }, [])

    return (
        <section className="contact_main">
            <div className="contact_mainBlock d-flex container">
                <div className="text d-flex flex-column">
                    <h2>Контакты</h2>
                    <h4>Магазины</h4>
                    <div>
                        <div className="text-block d-flex flex-column">
                            {
                                contacts.map((contact, i) =>{
                                    return (
                                        <div className="d-flex flex-column" key={i}>
                                            <p>{contact.address}</p>
                                            <a href={`tel:${contact.phoneLink}`}>{contact.phone}</a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <h4>Социальные сети</h4>
                    <p>@deviceufa</p>
                    <div className="text-social">
                        <div className="social-icons d-flex flex-row justify-content-start">
                            <a href="https://vk.com/ufa.device" target="_blank">
                                <div className="d-flex align-items-center justify-content-center">
                                    <img src="/assets/img/soc/vk.svg" alt="vk"/>
                                </div>
                            </a>
                            <a href="https://t.me/deviceufa" target="_blank">
                                <div className="d-flex align-items-center justify-content-center">
                                    <img src="/assets/img/soc/tg.svg" alt="tg"/>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}