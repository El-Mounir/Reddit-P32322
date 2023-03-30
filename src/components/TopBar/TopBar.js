import React, { useEffect,useRef} from 'react';
import {Search} from '../Search/Search';

export const TopBar =()=> {
    
    return(
        <header>
            <div className="header-container">
                <img/>
                <h4>Reddit<span>Eclair</span></h4>
                <Search/> 
            </div>
        </header>
    );
}