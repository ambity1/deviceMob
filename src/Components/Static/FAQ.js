import React from "react";
import {Accordion} from "react-bootstrap";

export default function FAQ(props) {
    return (
        <section className="faq">
            <div className="container d-flex flex-column">
                <h2>Часто задаваемые вопросы</h2>
                <Accordion>
                    <div>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                Меня не слышит собеседник, что делать?
                                <div className="accordion-header-circle"/>
                            </Accordion.Header>
                            <Accordion.Body>
                                <p>Основная причина неисправности-выход из строя микрофона. Для того, чтобы решить проблему необходимо провести диагностику, с целью подтверждения неисправности работы микрофона. Стоимость замены микрофона зависит от модели телефона.</p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                Я не слышу собеседника, что делать?
                                <div className="accordion-header-circle"/>
                            </Accordion.Header>
                            <Accordion.Body>В первую очередь, сразу после попадания в устройство жидкости, ни в коем случае не включайте его самостоятельно. Это может привезти к более серьезным поломкам. Необходимо сразу же обратиться в сервисный центр “Device”. Мы проведем вам чистку устройства после попадания токопроводящей жидкости и восстановим материнскую плату.</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                Уронил телефон в воду, что делать?
                                <div className="accordion-header-circle"/>
                            </Accordion.Header>
                            <Accordion.Body>В первую очередь, сразу после попадания в устройство жидкости, ни в коем случае не включайте его самостоятельно. Это может привезти к более серьезным поломкам. Необходимо сразу же обратиться в сервисный центр “Device”. Мы проведем вам чистку устройства после попадания токопроводящей жидкости и восстановим материнскую плату.</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                Экран целый, но не работает. В чем причина и что делать?
                                <div className="accordion-header-circle"/>
                            </Accordion.Header>
                            <Accordion.Body>В первую очередь нужно провести диагностику для выявления причины поломки. Как правило, причины кроются в дисплейном модуле или тачскрине. Необходимо провести замену сломанной детали.</Accordion.Body>
                        </Accordion.Item>
                    </div>
                    <div>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                Телефон не держит зарядку, что делать?
                                <div className="accordion-header-circle"/>
                            </Accordion.Header>
                            <Accordion.Body>Для устранения проблемы необходимо заменить аккумуляторную батарею и переустановить операционную систему.</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>
                                Телефон выключился и не включается, что делать?
                                <div className="accordion-header-circle"/>
                            </Accordion.Header>
                            <Accordion.Body>Для того, чтобы выяснить причину поломки необходимо провести диагностику. В сервисном центре Device диагностика проводится бесплатно.</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6">
                            <Accordion.Header>
                                На айфоне не работает кнопка «Домой», что делать?
                                <div className="accordion-header-circle"/>
                            </Accordion.Header>
                            <Accordion.Body>Распространенная проблема iPhone Apple – со временем перестает работать кнопка Home. Если вы столкнулись с этой проблемой необходимо обратиться в сервисный центр Device, где вам прочистят и заменят сломанную кнопку.</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="7">
                            <Accordion.Header>
                                Сохранятся ли данные телефона (телефонная книга, фото и видео материалы) после ремонта?
                                <div className="accordion-header-circle"/>
                            </Accordion.Header>
                            <Accordion.Body>Если данные не стерты изначально в выключенном аппарате, то сохранить их возможно</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="8">
                            <Accordion.Header>
                                У вас есть гарантия на ремонт?
                                <div className="accordion-header-circle"/>
                            </Accordion.Header>
                            <Accordion.Body>Сервисный центр Device дает гарантию на ремонт от 4 месяцев.</Accordion.Body>
                        </Accordion.Item>
                    </div>
                </Accordion>
            </div>
        </section>
    );
}