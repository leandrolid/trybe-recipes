import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TapasIcon from '@mui/icons-material/Tapas';
import PublicIcon from '@mui/icons-material/Public';
import ShuffleIcon from '@mui/icons-material/Shuffle';

import style from './buttonsExplore.module.scss';

function ButtonsExplore({ isMeal, recipeType, fetchRandom }) {
  return (
    <div className={ style.buttonsExplore }>

      <Link
        data-testid="explore-by-ingredient"
        to={ `/explorar/${recipeType}/ingredientes` }
      >
        <span role="img" aria-label="ingrediente">
          <TapasIcon />
        </span>
        Por Ingredientes
      </Link>

      {isMeal && (
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
        >
          <span role="img" aria-label="origem">
            <PublicIcon />
          </span>
          Por Local de Origem
        </Link>)}

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ fetchRandom }
      >
        <span role="img" aria-label="aleatório">
          <ShuffleIcon />
        </span>
        Me Surpreenda!
      </button>

    </div>
  );
}

ButtonsExplore.propTypes = {
  isMeal: PropTypes.bool.isRequired,
  recipeType: PropTypes.string.isRequired,
  fetchRandom: PropTypes.func.isRequired,
};

export default ButtonsExplore;
