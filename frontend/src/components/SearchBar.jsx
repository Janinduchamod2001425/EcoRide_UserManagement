import React from 'react';
import '../styles/SearchBar.css';
import searchIcon from '../images/home/search.png';

const SearchBar = () => {
    
    return (
        <div>
            <div className='searchbar'>
                <img src={searchIcon} className="search_icon" />
            </div>
        </div>
    )
}

export default SearchBar;