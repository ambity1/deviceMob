import React, { Component } from 'react';
import {connect} from "react-redux";
import InputMask from 'react-input-mask';
import {Navigate} from "react-router-dom";

class Auth extends Component {
    constructor(props) {
        super(props);

        this.phoneInp = React.createRef();
        this.nameInp = React.createRef();
        this.passInp = React.createRef();
        this.repeatPassInp = React.createRef();
        this.emailInp = React.createRef();

        this.loginPhoneInp = React.createRef();
        this.loginPassInp = React.createRef();

        this.state = {mode: 'auth', redirect: false};

        this.doReg = this.doReg.bind(this);
        this.doAuth = this.doAuth.bind(this);
        this.disableAllInputs = this.disableAllInputs.bind(this);
    }

    disableAllInputs(parent, bool){
        if(bool){
            [...parent.querySelectorAll('input')].forEach(item=>item.setAttribute('disabled', 'disabled'))
        }else{
            [...parent.querySelectorAll('input')].forEach(item=>item.removeAttribute('disabled'))
        }
    }

    doReg(e){
        e.preventDefault();
        let form = e.currentTarget;
        if(!(this.passInp.current.value === this.repeatPassInp.current.value)){
            this.passInp.current.setAttribute("aria-describedby","passIsNotEqualOrigin");
            this.repeatPassInp.current.setAttribute("aria-describedby","passIsNotEqualSecond");
            this.passInp.current.classList.add('is-invalid');
            this.repeatPassInp.current.classList.add('is-invalid');
        }else{
            let formData = new FormData(form);
            formData.delete('phone');
            formData.append('phone', this.phoneInp.current.value.split(/(?:\+| )+/).join(''));

            formData.append('method', 'register');

            this.disableAllInputs(form, true);

            fetch('/php/reg/', {
                method: 'post',
                body: formData
            }).then(response=>response.json())
                .then(res=>{
                    if(res.status === 'ok'){
                        this.setState({mode: 'auth'})
                    }else if(res.status === 'error'){
                        if(res.reason === 'already_registered'){
                            this.phoneInp.current.setAttribute('aria-describedby','phoneAlreadyRegistered');
                            this.phoneInp.current.classList.add('is-invalid');
                        }else if(res.reason === 'passwords_not_equal'){
                            this.passInp.current.setAttribute("aria-describedby","passIsNotEqualOrigin");
                            this.repeatPassInp.current.setAttribute("aria-describedby","passIsNotEqualSecond");
                            this.passInp.current.classList.add('is-invalid');
                            this.repeatPassInp.current.classList.add('is-invalid');
                        }
                        this.passInp.current.value = '';
                        this.repeatPassInp.current.value = '';
                        this.disableAllInputs(form, false);
                    }
                })
        }
    }

    doAuth(e){
        e.preventDefault();
        let form = e.currentTarget;
        let formData = new FormData();

        formData.append('grant_type', 'password');
        formData.append('client_id', 'iedo');
        formData.append('username', this.loginPhoneInp.current.value.split(/(?:\+| )+/).join(''));
        formData.append('password', this.loginPassInp.current.value);

        this.disableAllInputs(form, true);

        fetch("/php/token.php", {
            body: formData,
            method: "POST"
        }).then(resp=>resp.json())
            .then(result=>{
                if(result.hasOwnProperty('error') && result.error === "invalid_grant" && result.error_description === "Invalid username and password combination"){
                    this.disableAllInputs(form, false);
                    form.querySelector('#phoneInp').classList.add('is-invalid');
                    this.loginPassInp.current.classList.add('is-invalid');
                }else if(result.hasOwnProperty('access_token')){
                    window.localStorage.setItem('access_tokens', JSON.stringify(result));
                    this.setState({redirect: 'user'})
                }
            })
    }

    componentDidMount() {
        document.title = 'Авторизация';
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        if(this.state.redirect){
            return <Navigate to={`/${this.state.redirect}`} replace/>
        } else if(this.state.mode === 'auth'){
            return (
                <>
                    <h1 className='text-center'>Вход на сайт</h1>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <form className='signUp d-flex flex-column align-items-center justify-content-center mb-6' onSubmit={(e)=>{this.doAuth(e)}}>
                            <div className="form-floating mb-3">
                                <InputMask ref={this.loginPhoneInp} mask="+7 999 999 99 99" name='phone' className="form-control" id="phoneInp" placeholder="Телефон" required/>
                                <label htmlFor="phoneInp">Телефон</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input ref={this.loginPassInp} type="password" className="form-control" id="passInp" placeholder="Пароль" required maxLength='16' minLength='8'/>
                                <label htmlFor="passInp">Пароль</label>
                            </div>
                            <input type="submit" className="btn btn-primary" value='Войти'/>
                        </form>
                        <div onClick={()=>this.setState({mode: 'signup'})}>
                            Зарегистрироваться
                        </div>
                    </div>
                </>
            )
        }else if(this.state.mode === 'signup'){
            return (
                <>
                    <h1 className='text-center'>Регистрация на сайте</h1>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <form className='signUp d-flex flex-column align-items-center justify-content-center mb-3' onSubmit={(e)=>{this.doReg(e)}}>
                            <div className="form-floating mb-3">
                                <input ref={this.nameInp} type="text" name='name' className="form-control" id="nameInp" placeholder="Иван" required maxLength='20' minLength='2'/>
                                <label htmlFor="firstNameInp">Имя</label>
                            </div>
                            <div className="form-floating mb-3">
                                <InputMask ref={this.phoneInp} mask="+7 999 999 99 99" name='phone' className="form-control" id="phoneInp" placeholder="Телефон" required/>
                                <label htmlFor="phoneInp">Телефон</label>
                                <div id="phoneAlreadyRegistered" className="invalid-feedback">Пользователь с таким номером телефона уже зарегистрирован</div>
                            </div>
                            <div className="form-floating mb-3">
                                <input ref={this.passInp} type="password" name='pass' className="form-control" id="passInp" placeholder="Пароль" required maxLength='16' minLength='8'/>
                                <label htmlFor="passInp">Пароль</label>
                                <div id="passIsNotEqualOrigin" className="invalid-feedback">Пароли не совпадают</div>
                            </div>
                            <div className="form-floating mb-3">
                                <input ref={this.repeatPassInp} type="password" name='repeat_pass' className="form-control" id="repeatPassInp" placeholder="Повторите пароль" required maxLength='16' minLength='8'/>
                                <label htmlFor="repeatPassInp">Повторите пароль</label>
                                <div id="passIsNotEqualSecond" className="invalid-feedback">Пароли не совпадают</div>
                            </div>
                            <input type="submit" className="btn btn-primary" value='Зарегистрироваться'/>
                        </form>
                        <div onClick={()=>this.setState({mode: 'auth'})}>
                            Войти
                        </div>
                    </div>
                </>
            );
        }
    }
}

const AuthConst = connect(
    state => ({

    }),
    dispatch => ({

    })
)(Auth);

export default AuthConst;