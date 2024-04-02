import React, { Component } from 'react';
import { connect } from "react-redux";
import {query} from "../../../async/async";
import {Link, useParams} from "react-router-dom";
import {SkeletonBrick} from "@consta/uikit/Skeleton";
import FAQ from "../../../Components/Static/FAQ";
import Contacts from "../../../Components/Static/Contacts";
import About from "../../../Components/Static/About";
import {Accordion} from "react-bootstrap";
import DontKnowMyModel from "../../../Components/Modals/ServiceModals/DontKnowMyModel";
import ServiceSlider from "../../../Components/Sliders/ServiceSlider";
import Breadcrumbs from "../../../Components/Breadcrumbs/Breadcrumbs";
import RecordForRepair from "../../../Components/Modals/ServiceModals/RecordForRepair";

class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state={error: false, isLoadedModels: false, categories:false, currCat:false, isModalOpen: false, isModalRecordOpen: false};
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
                    this.setState({error:false, isLoadedModels: true, categories: res.categories, currCat: res.main});
                }else{
                    this.setState({error:true, isLoadedModels: true, categories: false, currCat: false, isModalOpen: false}, ()=>{
                        document.title = 'Сервис | DEVICE';
                    });
                }
            })
    }

    componentWillMount() {
        this.getModels();
        window.scrollTo(0, 0);
    }

    render() {
        if(!this.state.error) {
            return(
                <>
                    <Breadcrumbs url={window.location.pathname.slice(1)} type='repair_breadcrumbs/category/'/>
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
                    <section className="selectDevice2">
                        <div className="container d-flex flex-column">
                            <h2>Выберите устройство</h2>
                            <div className="d-flex flex-column flex-xl-row">
                                <div className="helpDevice helpDevice-s d-flex flex-column flex-md-row align-items-md-center justify-content-between align-items-end d-xl-none" style={{padding: 0}}>
                                    <img src="/media/remont/questions.svg"/>
                                    <div className="d-flex flex-column w-100" style={{padding: '20px 20px 0 20px'}}>
                                        <p className='text-center'>Не знаете, какая у вас модель устройства?</p>
                                        <div className="btn-w" onClick={()=>{this.toggleModal(true)}}>Я не знаю модель</div>
                                    </div>
                                    <img src="/media/remont/question_hand2.svg"/>
                                </div>
                                <Accordion className='selectDevice2-block'>
                                    {
                                        this.state.categories
                                        ? this.state.categories.map(category=>{
                                            return (category?.categories
                                            ? <Accordion.Item eventKey={category.alias}>
                                                <Accordion.Header>
                                                    <img src={`/${category.photo}`}/><p>{category.label}</p>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        category?.categories
                                                        ? category.categories.map(child=>{
                                                                return(<Link to={child.alias}>{child.label}</Link>)
                                                            })
                                                        : <></>
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            // : <Link><div className='noChilds'><img src={`/${category.photo}`}/><p>{category.label}</p></div></Link>
                                            : <Link to={category.alias} className='noChilds d-flex align-items-center'>
                                                <img src={`/${category.photo}`}/><p>{category.label}</p>
                                            </Link>
                                            )})
                                        : <></>
                                    }
                                </Accordion>
                                <div className="helpDevice d-none d-xl-flex flex-column">
                                    <img src="/media/remont/questions.svg"/>
                                    <p className='text-center'>Не знаете, какая у вас модель устройства?</p>
                                    <div className="btn-w" onClick={()=>{this.toggleModal(true)}}>Я не знаю модель</div>
                                    <img src="/media/remont/question_hand2.svg"/>
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
