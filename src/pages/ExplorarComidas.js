import PropTypes from 'prop-types';
import React from 'react';
import ButtonsExplore from '../components/ButtonsExplore';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarComidas({ history }) {
  const isTrue = true;

  const fetchRandomMeal = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then(({ meals: [meal] }) => history.push(`/comidas/${meal.idMeal}`))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Header pageTitle="Explorar Comidas" history={ history } isMeal />
      <ButtonsExplore
        isMeal={ isTrue }
        recipeType="comidas"
        fetchRandom={ fetchRandomMeal }
      />
      <Footer />
    </>
  );
}

ExplorarComidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
