import React, { Component } from 'react';
import { connect } from "react-redux";
import {query} from "../../../../async/async";
import {Link, useParams} from "react-router-dom";
import {SkeletonBrick, SkeletonText} from "@consta/uikit/Skeleton";
import FAQ from "../../../../Components/Static/FAQ";
import Contacts from "../../../../Components/Static/Contacts";
import About from "../../../../Components/Static/About";
import DontKnowMyModel from "../../../../Components/Modals/ServiceModals/DontKnowMyModel";
import Breadcrumbs from "../../../../Components/Breadcrumbs/Breadcrumbs";
import {Accordion} from "react-bootstrap";

class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state={error: false, isLoadedModels: false, models:false, currCat:false, isModalOpen: false};
        this.getModels=this.getModels.bind(this);
    }

    toggleModal(val){
        this.setState({isModalOpen: val});
    }

    getModels(){
        this.setState({error: false, isLoadedModels: false, models: false, currCat: false, isModalOpen: false})
        let pr = new FormData();
        query(`/api/repair_products/${this.props.params.models}`, pr).then(response=>response.json())
            .then(res=>{
                if(res.status == 'ok'){
                    this.setState({error:false, isLoadedModels: true, models: res.categories, currCat: res.main});
                }else{
                    this.setState({error:true, isLoadedModels: true, models: false, currCat: false, isModalOpen: false}, ()=>{
                        document.title = 'Сервис | DEVICE';
                    });
                }
            })
    }

    componentWillMount() {
        this.getModels();
        window.scrollTo(0, 0)
    }

    render() {
        if(!this.state.error) {
            return(
                <>
                    <Breadcrumbs url={window.location.pathname.slice(1)} type='repair_breadcrumbs/category/'/>
                    <div className="container modelPage">
                        {
                            this.state.currCat?.label
                            ? <h2>{this.state.currCat.label}</h2>
                            : <SkeletonBrick height={70}/>
                        }
                    </div>
                    <section className="selectModel">
                        <div className="container">
                            <h2>Выберите модель</h2>
                            <div className="d-flex">
                                <div className="helpDevice helpDevice-s d-flex flex-column flex-md-row align-items-md-center justify-content-between align-items-end d-xl-none" style={{padding: 0}}>
                                    <img src="/media/remont/questions.svg"/>
                                    <div className="d-flex flex-column w-100" style={{padding: '20px 20px 0 20px'}}>
                                        <p className='text-center'>Не знаете, какая у вас модель устройства?</p>
                                        <div className="btn-w" onClick={()=>{this.toggleModal(true)}}>Я не знаю модель</div>
                                    </div>
                                    <img src="/media/remont/question_hand2.svg"/>
                                </div>
                                <div className="selectModel-block d-flex flex-column">
                                    {
                                        this.state.isLoadedModels
                                        ? this.state.models?.length
                                            ? this.state.models.map(category=>{
                                                if(category?.products?.length){
                                                    return (
                                                        <div className="selectModel-block-item d-flex flex-column">
                                                            <div className="d-flex align-items-center">
                                                                <p>{category.label}</p>
                                                                <div className="selectModel-block-item-line"/>
                                                            </div>
                                                            <div className="d-flex flex-wrap">
                                                                {
                                                                    category.products.map(prod=>{
                                                                        return <Link to={prod.alias}
                                                                                     class='d-flex flex-column align-items-center'
                                                                                     style={{rowGap: 30}}>
                                                                            <img src={`/${prod.photo}`}
                                                                                 style={{maxWidth: 120}}/>
                                                                            {prod.label}
                                                                        </Link>
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                            : <p>Модели данной линейки не найдены</p>
                                        : <>
                                            <div className="selectModel-block-item d-flex flex-column">
                                                <SkeletonText rows={1}/>
                                                <SkeletonBrick height={60}/>
                                            </div>
                                            <div className="selectModel-block-item d-flex flex-column">
                                                <SkeletonText rows={1}/>
                                                <SkeletonBrick height={60}/>
                                            </div>
                                            <div className="selectModel-block-item d-flex flex-column">
                                                <SkeletonText rows={1}/>
                                                <SkeletonBrick height={60}/>
                                            </div>
                                        </>
                                    }
                                </div>
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
