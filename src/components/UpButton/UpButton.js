import React from "react";
import { useScrollPosition } from "../../app/utilities";
import './UpButton.css';

export const UpButton = () => {
    const scrollPosition = useScrollPosition();

    const onClickHandler = () => {
        window.scroll(0,0);
    };
    
    return (
        <button className={scrollPosition === 0 ? 'hidden' : 'upToTop'} onClick={onClickHandler} >Up</button>
    )
}