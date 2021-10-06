import PropTypes from 'prop-types';
import React, { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import ButtonBack from '../ButtonBack';
import SearchBar from '../SearchBar';

import style from './header.module.scss';

const Header = ({ pageTitle, history, isMeal = true }) => {
  const [showBar, setShowBar] = useState(false);

  const checkObj = {
    'Explorar Origem': true,
    Comidas: true,
    Bebidas: true,
  };

  const handleSearchBtnClick = () => {
    setShowBar(!showBar);
  };

  return (
    <>
      <header className={ style.header }>
        <input
          type="image"
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="profile icon"
          onClick={ () => history.push('/perfil') }
        />
        <h2 data-testid="page-title">{ pageTitle }</h2>
        {checkObj[pageTitle]
          ? (
            <input
              type="image"
              data-testid="search-top-btn"
              alt="search icon"
              src={ searchIcon }
              onClick={ handleSearchBtnClick }
            />)
          : <ButtonBack />}
      </header>
      { showBar
        && (
          <SearchBar
            isMeal={ isMeal }
            handleSearchBtnClick={ handleSearchBtnClick }
          />) }
    </>
  );
};

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  isMeal: PropTypes.bool.isRequired,
};

export default Header;
