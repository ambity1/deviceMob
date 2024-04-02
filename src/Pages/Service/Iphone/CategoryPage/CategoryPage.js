import React, { Component } from 'react';
import { connect } from "react-redux";
import {query} from "../../../../async/async";
import {Link, useParams} from "react-router-dom";
import {SkeletonBrick} from "@consta/uikit/Skeleton";
import FAQ from "../../../../Components/Static/FAQ";
import Contacts from "../../../../Components/Static/Contacts";
import About from "../../../../Components/Static/About";
import {Accordion} from "react-bootstrap";
import DontKnowMyModel from "../../../../components/Modals/ServiceModals/DontKnowMyModel";

class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state={error: false, isLoadedModels: false, categories:false, currCat:false, isModalOpen: false};
        this.getModels=this.getModels.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
    }

    toggleModal(val){
        this.setState({isModalOpen: val});
    }

    getModels(){
        this.setState({error: false, isLoadedModels: false, categories: false, currCat: false, isModalOpen: false})
        let pr = new FormData();
        query(`/api/repair_category/${this.props.params.category}`, pr).then(response=>response.json())
            .then(res=>{
                if(res.status == 'ok'){
                    this.setState({error:false, isLoadedModels: true, categories: res.categories, currCat: res.main}, ()=>{
                        document.title = `${this.state?.currCat?.label ? this.state.currCat.label : 'Сервис'} | DEVICE`
                    });
                }else{
                    this.setState({error:true, isLoadedModels: true, categories: false, currCat: false, isModalOpen: false}, ()=>{
                        document.title = 'Сервис | DEVICE';
                    });
                }
            })
    }

    componentWillMount() {
        this.getModels();
    }

    render() {
        if(!this.state.error) {
            return(
                <>
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
                    <section className="selectDevice2">
                        <div className="container d-flex flex-column">
                            <h2>Выберите устройство</h2>
                            <div className="d-flex flex-column flex-xl-row">
                                <div className="helpDevice helpDevice-s d-flex d-xl-none">
                                    <img src="/media/remont/questions.svg"/>
                                    <div className="d-flex flex-column">
                                        <p>Не знаете, какая у вас модель телефона?</p>
                                        <div className="btn-w" onClick={()=>{this.toggleModal(true)}}>Я не знаю модель телефона</div>
                                    </div>
                                    <img src="/media/remont/question_hand.svg"/>
                                </div>
                                <Accordion className='selectDevice2-block'>
                                    {
                                        this.state.categories
                                            ? this.state.categories.map(category=>{
                                                return (<Link to={category.alias} className='noChilds'>
                                                            <img src={`/${category.photo}`}/><p>{category.label}</p>
                                                        </Link>)})
                                            : <></>
                                    }
                                </Accordion>
                                <div className="helpDevice d-none d-xl-flex flex-column">
                                    <img src="/media/remont/questions.svg"/>
                                    <p>Не знаете, какая у вас модель телефона?</p>
                                    <div className="btn-w" onClick={()=>{this.toggleModal(true)}}>Я не знаю модель телефона</div>
                                    <img src="/media/remont/question_hand.svg"/>
                                </div>
                            </div>
                        </div>
                    </section>
                    <FAQ/>
                    <About/>
                    <Contacts/>
                    <DontKnowMyModel isModalOpen={this.state.isModalOpen} toggleModal={(val)=>{this.toggleModal(val)}}/>
                </>
            );
        }
    }
}

const CategoryPageTo = connect(
    state => ({
    }),
    dispatch => ({
    })
)(CategoryPage);

function withRouter(Component) {
    return props => <Component {...props} params={useParams()}/>
}

const CategoryPageToWrapped = withRouter(CategoryPageTo);
export default CategoryPageToWrapped;
