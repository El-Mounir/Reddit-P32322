import React, { useState,useEffect } from "react";
import './UpButton.css';

export const UpButton = () => {
    // const [isTop,setIsTop] = useState(true);
    // const yLocation = window.scrollY;


    // useEffect(() =>{
    //     if (yLocation > 10) {
    //         setIsTop(false);
    //         console.log(yLocation)
    //     }

    // },[yLocation])

    const onClickHandler = () => {
        window.scroll(0,0);
    }

    return (
        <button className='upToTop' onClick={onClickHandler}>Up</button>
    )
}