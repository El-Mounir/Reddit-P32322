import React from 'react';

export const ArticlesTypes=()=> {
    return(
        <section className='article-types'>
            <nav className='types-container'>
                <ul className="navBar-container">
                    <li>
                        <button>Hot</button>
                    </li>
                    <li>
                        <button>New</button>
                    </li>
                    <li>
                        <button>Top</button>
                    </li>
                </ul>
            </nav>
        </section>
    );
}