import React, { Component } from "react";
import {connect} from "react-redux";
import InputMask from "react-input-mask";
import {getUserInfo} from "../../store/actions/auth/auth";
import {Navigate} from "react-router-dom";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false}
    }

    componentWillMount() {
        document.title = 'Личный кабинет';
        if(window.localStorage.getItem('access_tokens')){
            !this.props.user ? this.props.getUserInfo() : false;
        }else{
            this.setState({redirect: 'auth'})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        if(this.state.redirect){
            return <Navigate to={`/${this.state.redirect}`} replace/>
        }else{
            if(this.props.user){
                return (
                    <div className='lk'>
                        <h1>Личный кабинет</h1>
                        <form>
                            <div className='lk-info d-flex align-items-start justify-content-around'>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="nameInp" placeholder="Имя" maxLength='20' minLength='2' defaultValue={this.props.user.name} disabled/>
                                    <label htmlFor="nameInp">Имя</label>
                                </div>
                                <div className="form-floating">
                                    <InputMask mask="+7 999 999 99 99" type="text" className="form-control" id="phoneInp" placeholder="Номер телефона" maxLength='16' minLength='16' defaultValue={`+${this.props.user.phone}`} disabled/>
                                    <label htmlFor="phoneInp">Номер телефона</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="bDayInp" placeholder="Дата рождения" defaultValue={this.props.user.b_day} disabled/>
                                    <label htmlFor="bDayInp">Дата рождения</label>
                                </div>
                            </div>
                            <div className='lk-adresses'>
                                {this.props.user.hasOwnProperty('adresses') && this.props.user.adresses.length
                                ? this.props.user.adresses.map(adress=>{

                                    })
                                : <p>Нет адресов</p>
                                }
                            </div>
                        </form>
                    </div>
                )
            }else{
                return (
                    <>
                        <p>Загрузка...</p>
                    </>
                );
            }
        }
    }
}

const UserConst = connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        getUserInfo: () => dispatch(getUserInfo()),
    })
)(User);

export default UserConst;