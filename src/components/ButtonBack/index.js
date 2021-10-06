import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RecipesContext from '../../context/RecipesContext';

import style from './buttonBack.module.scss';

function ButtonBack() {
  const history = useHistory();
  const { setIsLoading } = useContext(RecipesContext);

  const goBack = async () => {
    await setIsLoading(true);
    history.goBack();
  };

  return (
    <button
      className={ style.buttonBack }
      type="button"
      onClick={ goBack }
    >
      <ArrowBackIcon />
    </button>
  );
}

export default ButtonBack;
