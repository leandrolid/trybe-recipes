import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import './css/RecomendationCard.css';
// import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

import style from './recomendationCard.module.scss';

const RecomendationCard = ({ name, thumb, index, id, isMeal }) => (
  <Link
    to={ !isMeal ? `/comidas/${id}` : `/bebidas/${id}` }
    className={ style.recomendationItem }
  >
    <img
      data-testid={ `${index}-recomendation-card` }
      src={ thumb }
      alt={ `${name} thumbnail` }
    />
    <div className={ style.title }>
      <h5 data-testid={ `${index}-recomendation-title` }>{ name }</h5>
    </div>
  </Link>
);

RecomendationCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isMeal: PropTypes.bool.isRequired,
};

export default RecomendationCard;
