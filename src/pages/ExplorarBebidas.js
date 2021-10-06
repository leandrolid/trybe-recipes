import PropTypes from 'prop-types';
import React from 'react';
import ButtonsExplore from '../components/ButtonsExplore';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarBebidas({ history }) {
  const fetchRandomDrink = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then(({ drinks: [drink] }) => history.push(`/bebidas/${drink.idDrink}`))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Header pageTitle="Explorar Bebidas" history={ history } isMeal />
      <ButtonsExplore
        isMeal={ false }
        recipeType="bebidas"
        fetchRandom={ fetchRandomDrink }
      />
      <Footer />
    </>
  );
}

ExplorarBebidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
