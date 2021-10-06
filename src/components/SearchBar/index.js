import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
// import { FormControlLabel, Radio } from '@mui/material';
import RecipesContext from '../../context/RecipesContext';

import style from './searchBar.module.scss';

const SearchBar = ({ isMeal, handleSearchBtnClick }) => {
  const [input, setInput] = useState('');
  const [radio, setRadio] = useState('Ingrediente');
  const { handleBtnClick } = useContext(RecipesContext);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    handleBtnClick({ input, isMeal, radio });
    handleSearchBtnClick();
  };

  return (
    <div
      className={ style.modalBackground }
    >
      <form onSubmit={ handleSubmitSearch }>
        <button
          type="button"
          className={ style.closeModal }
          onClick={ handleSearchBtnClick }
        >
          X
        </button>
        <input
          id="search-text-input"
          placeholder="Procurar"
          value={ input }
          onChange={ ({ target }) => setInput(target.value) }
          type="text"
          data-testid="search-input"
        />
        <div
          name="radio-buttons-group"
          onChange={ ({ target }) => setRadio(target.value) }
          className={ style.radioGroup }
        >
          <label
            htmlFor="Ingrediente"
            className={ radio === 'Ingrediente' ? style.checked : null }
          >
            <input
              id="Ingrediente"
              name="search"
              value="Ingrediente"
              defaultChecked
              // label="Ingrediente"
              data-testid="ingredient-search-radio"
              type="radio"
            />
            Ingrediente
          </label>
          <label
            htmlFor="Nome"
            className={ radio === 'Nome' ? style.checked : null }
          >
            <input
              id="Nome"
              name="search"
              value="Nome"
              // label="Nome"
              data-testid="name-search-radio"
              type="radio"
            />
            Nome
          </label>
          <label
            htmlFor="Primeira Letra"
            className={ radio === 'Primeira Letra' ? style.checked : null }
          >
            <input
              id="Primeira Letra"
              name="search"
              value="Primeira Letra"
              // label="Primeira Letra"
              data-testid="first-letter-search-radio"
              type="radio"
            />
            Primeira Letra
          </label>
        </div>
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ handleSubmitSearch }
          className={ style.submitButton }
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  isMeal: PropTypes.bool.isRequired,
  handleSearchBtnClick: PropTypes.func.isRequired,
};

export default SearchBar;
