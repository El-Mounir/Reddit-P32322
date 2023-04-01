import React , { useRef , useState, useEffect }from 'react';
import { ROUTES } from '../../app/Routes';
import { useNavigate } from 'react-router-dom';
import { isLoadingResult,loadSearchResultByName } from '../SearchResult/searchResultSlice';
import { useSelector, useDispatch } from 'react-redux';

export const Search=()=> {
    const [searchTerm, setSearchTerm] = useState("");
    const loadingResult = useSelector(isLoadingResult);
    const dispatch = useDispatch();
    const history = useNavigate();
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
        history(ROUTES.searchResult(searchQuery));
    };
    
    if(loadingResult)
        return <div>Loading Results...</div>;

    return(
            <div className="searchBar-container">
                <form onSubmit={onSearchHandler}>
                    <input type='text' placeholder='Search Reddit' ref={searchInputRef} className='searchBar'/>
                </form>
            </div>
    );
}