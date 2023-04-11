import React , { useRef , useState, useEffect }from 'react';
import { ROUTES } from '../../app/Routes';
import { useNavigate } from 'react-router-dom';
import { loadSearchResultByName } from '../../components/SearchResult/searchResultSlice';
import { useDispatch } from 'react-redux';
import './Search.css';

export const Search=()=> {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchInputRef = useRef();

    useEffect(()=>{
       if (searchTerm) {
            dispatch(loadSearchResultByName(searchTerm));
        }
    },[dispatch,searchTerm]);

    const onSearchHandler = (e) => {
        e.preventDefault();
        const searchQuery = new URLSearchParams({
          q: searchInputRef.current.value
        }).toString();
        setSearchTerm(searchInputRef.current.value);
        navigate(ROUTES.searchResult(searchQuery));
    };
    

    return(
            <div className='searchBar-wrapper'>
                <form onSubmit={onSearchHandler} className="searchBar-container">
                    <input type='text' placeholder='Search Reddit' ref={searchInputRef} className='searchBar'/>
                    <button className='searchButton' type='button'><i className='fas fa-search'></i></button>
                </form>
            </div>
    );
}