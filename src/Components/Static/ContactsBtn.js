import React, {createRef, useState} from "react";

export default function ContactsBtn(props) {
    const [isOpen, setIsOpen] = useState(false);
    const stickyBtnContent = createRef();

    function toggle() {
        if(isOpen){
            setIsOpen(false);
            stickyBtnContent.current.style.display = 'none';
        }else{
            setIsOpen(true);
            stickyBtnContent.current.style.display = 'flex';
        }
    }

    return (
        <div className="stickyBtn d-flex align-items-center">
            <div className={`d-flex align-items-center justify-content-center triggerBtn ${isOpen ? '' : 'closed'}`} onClick={toggle}>
                <img src={isOpen ? "/assets/img/fixedbtn/close.svg" : "/assets/img/fixedbtn/jivo.svg"} className='firstImg'/>
                <img src="/assets/img/fixedbtn/phone.svg" className='secondImg'/>
            </div>
            <ul style={{display: 'none'}} ref={stickyBtnContent}>
                <li>
                    <a href="https://t.me/deviceufa" title="Telegram" className="btn-floating" target="_blank">
                        <img src="/assets/img/fixedbtn/tg.svg"/>
                    </a>
                </li>
                <li>
                    <a href="https://vk.com/ufa.device" title="VK" className="btn-floating" target="_blank">
                        <img src="/assets/img/fixedbtn/vk.svg"/>
                    </a>
                </li>
                <li>
                    <a title="Чат" className="btn-floating" onClick={()=>{jivo_api.open()}}>
                        <img src="/assets/img/fixedbtn/jivo.svg"/>
                    </a>
                </li>
                <li>
                    <a href="tel:+79371365555" className="btn-floating" title="Наш номер телефона">
                        <img src="/assets/img/fixedbtn/phone.svg"/>
                    </a>
                </li>
            </ul>
        </div>
    );
}