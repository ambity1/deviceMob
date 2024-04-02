import React, {createRef, useState} from "react";
import InputMask from "react-input-mask";
import {query} from "../../async/async";

export default function ServiceOffer(props)  {
    let form = createRef();

    const [isOk, setIsOk] = useState(2);

    function submitForm(e){
        e.preventDefault();
        let fd = new FormData(form.current);
        fd.append('type', `Запись на ремонт`);
        query('/api/zayavka', fd)
            .then(resp=>resp.json())
            .then(res=>{
                if(res.status = 'ok'){
                    setIsOk(1);
                }else{
                    setIsOk(0);
                }
            })
    }

    return(
        <div className="serviceOffer d-flex align-items-center">
            <div className="container position-relative h-100 serviceOffer-block d-flex align-items-center justify-content-between">
                {
                    isOk === 1
                        ? <div className='d-flex align-items-center justify-content-center flex-grow-1'>
                            <div className="d-flex flex-column align-items-center done">
                                <img src="/media/serviceOffer/done.svg" alt=""/>
                                <p className='text-center'>Заявка успешно отправлена!</p>
                                <span className='text-center'>Наш консультант вскоре вам перезвонит для уточнения деталей</span>
                            </div>
                        </div>
                        : isOk === 2
                        ? <div className='d-flex align-items-center justify-content-center flex-grow-1'>
                            <form className="d-flex flex-column" ref={form} onSubmit={(e)=>{submitForm(e)}}>
                                <div className="d-flex flex-column">
                                    <p className="request">Запишитесь на ремонт прямо сейчас</p>
                                </div>
                                <div className="d-flex flex-column">
                                    <input name="name" placeholder="Имя" type="text" required=""/>
                                </div>
                                <div className="d-flex flex-column">
                                    <InputMask  mask="+7 999 999-99-99" name="phone" size="16" placeholder="Телефон" required/>
                                </div>
                                <button className="btn btn-callback">Записаться на ремонт</button>
                                <p className="text-center policy">Нажимая на кнопку, вы соглашаетесь с <a href="/policy" target='_blank'>Политикой конфиденциальности</a></p>
                            </form>
                        </div>
                        : <div className="d-flex flex-column">
                            <p className="request">Ошибка!</p>
                            <span className="request2">Произошла ошибка, попробуйте снова позже.</span>
                        </div>
                }
            </div>
        </div>
    );
}