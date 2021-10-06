import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeIcon from '@mui/icons-material/Home';
import RecipesContext from '../../context/RecipesContext';

import style from './buttonHome.module.scss';

function ButtonHome({ path }) {
  const history = useHistory();
  const { setIsLoading } = useContext(RecipesContext);

  const goHome = () => {
    setIsLoading(true);
    history.push(`/${path}`);
  };

  return (
    <button
      className={ style.buttonBack }
      type="button"
      onClick={ goHome }
    >
      <HomeIcon />
    </button>
  );
}

ButtonHome.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ButtonHome;
