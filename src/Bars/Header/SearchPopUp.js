import React, {useEffect, useRef, useState} from 'react';
import {debounce} from "../../usefullFunctions/usefullFunctions";
import {query} from "../../async/async";
import {Link} from "react-router-dom";

export default function SearchPopUp(props) {
    const [searchValue, setSearchValue] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    const searchDebounceRef = useRef();

    useEffect(()=>{
        searchValue ? debounce(()=>getSearchResults(searchValue), 500, searchDebounceRef) : setSearchResults(null);
    }, [searchValue])

    const getSearchResults = (word) => {
        let pc = new FormData();
        pc.append('word', word);
        query('/api/search', pc).then(response=>response.json())
            .then(res=>{
                if(res?.suggests?.length){
                    setSearchResults(res.suggests);
                }else{
                    setSearchResults('empty');
                }
            })
    }

    return(
        <div className={`searchPopUp ${props.isOpen ? 'active' : ''}`} style={{paddingTop: props.topPadding}}>
            <div className='searchPopUp-content'>
                <div className='container d-flex flex-column h-100'>
                    <div className='d-flex align-items-center searchPopUp-upper'>
                        <div className='searchPopUp-close d-md-none' title='Закрыть' onClick={()=>props.toggle(false)}>
                            <img src="/media/i/arrow-left-grey.svg" alt="←"/>
                        </div>
                        <div className='searchPopUp-field flex-grow-1'>
                            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Поиск по товарам'/>
                        </div>
                        <div className='searchPopUp-close d-none d-md-block' title='Закрыть' onClick={()=>props.toggle(false)}>
                            <img src="/media/i/close.svg" alt="x"/>
                        </div>
                    </div>
                    <div className='d-flex flex-column searchPopUp-bottom flex-grow-1'>
                        {
                            searchResults === 'empty'
                                ? <div className='d-flex align-items-center searchPopUp-result--empty'>
                                    <div>
                                        <p className='mb-0'>Ничего не найдено</p>
                                    </div>
                                </div>
                                : searchResults?.length &&
                                searchResults.map(item =>{
                                    return (
                                        <Link to='/search' state={{ from: "search", word: item }} onClick={()=>props.toggle(false)}>
                                            <div className='d-flex align-items-center searchPopUp-result'>
                                                <div>
                                                    <img src="/media/i/searchiconblue.svg" alt=""/>
                                                </div>
                                                <div>
                                                    <p className='mb-0'>{item}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
            {/*<div className='searchPopUp-bcg' title='Закрыть' onClick={()=>props.toggle(false)}/>*/}
        </div>
    )
}