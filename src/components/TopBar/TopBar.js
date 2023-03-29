import React from 'react';
import {Search} from '../Search/Search';

export const TopBar=()=> {
    return(
        <header>
            <div className="header-container">
                <img/>
                EM<span>Reddit</span>Flavour
                <Search/> 
            </div>
        </header>
    );
}