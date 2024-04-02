import React, {createRef, useState} from "react";
import {query} from "../../async/async";
import InputMask from "react-input-mask";
import {useSelector} from "react-redux";
import {useDispatch} from 'react-redux'

export default function AskQuestion(props)  {
    const isOpen = useSelector((state) => state.askQuestionModalOpen);
    const dispatch = useDispatch();

    let form = createRef();

    const [isOk, setIsOk] = useState(2);
    const [isErrorPhone, setIsErrorPhone] = useState(false);

    function submitForm(e){
        e.preventDefault();
        let fd = new FormData(form.current);

        if(fd.get('name')?.length && fd.get('phone').split(/[-_()^\s*$]+/).join('').length === 12){
            let inputs = [...form.current.querySelectorAll('input, button')];
            inputs.forEach(item => item.setAttribute('disabled', 'disabled'));
            setIsErrorPhone(false);
            fd.append('type', 'Задать вопрос');
            fd.append('url', `${document.location.pathname}`);
            if(window.ym){
                ym(94056202, 'getClientID', function(clientID) {
                    fd.append('clientid', clientID);
                });
            }
            query('/api/zayavka', fd)
                .then(resp=>resp.json())
                .then(res=>{
                    if(res.status === 'ok'){
                        setIsOk(1);
                    }else{
                        setIsOk(0);
                    }
                })
        }else{
            setIsErrorPhone(true);
        }
    }

    return(
        <div className={`ask-order ${isOpen ? 'd-flex' : ''}`}>
            <div className='ask-overlay' onClick={()=>{dispatch({type: 'SET_ASK_QUESTION_MODAL_OPEN', val: false})}}/>
            <div className="container ask-block">
                <div className="ask-block-close" onClick={()=>{dispatch({type: 'SET_ASK_QUESTION_MODAL_OPEN', val: false})}} />
                {
                    isOk === 1
                        ? <div className="d-flex flex-column">
                            <p className="request">Спасибо!</p>
                            <span className="request2">Скоро мы с вами свяжемся.</span>
                        </div>
                        : isOk === 2
                        ? <form className="d-flex flex-column" ref={form} onSubmit={(e)=>{submitForm(e)}}>
                            <div className="d-flex flex-column">
                                <p className="request">Задать вопрос</p>
                            </div>
                            <div className="ask-block-fields ask-block-fields-buy d-flex flex-column">
                                <div className="d-flex flex-column">
                                    <input name="name" placeholder="Имя" type="text" required style={isErrorPhone ? {border: '2px solid #ff0000'} : {border: '2px solid #E2E2E2'}}/>
                                </div>
                                <div className="d-flex flex-column">
                                    <InputMask  mask="+7 999 999-99-99" name="phone" size="16" placeholder="Телефон" required style={isErrorPhone ? {border: '2px solid #ff0000'} : {border: '2px solid #E2E2E2'}}/>
                                </div>
                            </div>
                            <button className="btn btn-callback">Отправить</button>
                            <p className="text-center">Нажимая на кнопку, вы соглашаетесь с <a href="/policy">Политикой конфиденциальности</a></p>
                        </form>
                        : <div className="d-flex flex-column">
                            <p className="request">Ошибка!</p>
                            <span className="request2">Произошла ошибка, попробуйте снова позже.</span>
                        </div>
                }
            </div>
        </div>
    );
}