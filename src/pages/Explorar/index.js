import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import style from './explorar.module.scss';

export default function Explorar({ history }) {
  return (
    <>
      <Header pageTitle="Explorar" history={ history } isMeal />
      <main className={ style.explore }>
        <Link to="/explorar/comidas" data-testid="explore-food">
          <span role="img" aria-label="comida">
            <FastfoodIcon />
          </span>
          {' '}
          Explorar Comidas
        </Link>
        <Link to="/explorar/bebidas" data-testid="explore-drinks">
          <span role="img" aria-label="bebida">
            <LocalBarIcon />
          </span>
          {' '}
          Explorar Bebidas
        </Link>
      </main>
      <Footer />
    </>
  );
}

Explorar.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
