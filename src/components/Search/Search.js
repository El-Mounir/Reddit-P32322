import React , { useRef }from 'react';
import { useNavigate } from 'react-router-dom';

export const Search=()=> {
    const history = useNavigate();
    const searchInputRef = useRef();
    const onSearchHandler = (e) => {
        e.preventDefault();
    
        const searchQuery = new URLSearchParams({
          q: searchInputRef.current.value
        }).toString();
        history(`/search/?${searchQuery}`);
        // direct to the search result page
    };
    return(
            <div className="searchBar">
                <form onSubmit={onSearchHandler}>
                    <input type='text' placeholder='Search Reddit' ref={searchInputRef} />
                </form>
            </div>
    );
}