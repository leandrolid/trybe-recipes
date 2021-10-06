import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import CardIngredient from '../../components/CardIngredient';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

import style from './explorarBebidasIngredientes.module.scss';

export default function ExplorarComidasIngredientes({ history }) {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      const MAXINGREDIENTS = 12;
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      const IngredientArray = data.drinks.slice(0, MAXINGREDIENTS);
      setIngredients(IngredientArray);
      setIsLoading(false);
    };
    fetchIngredients();
  }, []);

  return (
    isLoading
      ? <Loading />
      : (
        <>
          <Header pageTitle="Explorar Ingredientes" history={ history } isMeal />

          <main className={ style.exploreIngredients }>
            {ingredients.map(({ strIngredient1 }, index) => (
              <CardIngredient
                key={ strIngredient1 }
                index={ index }
                isMeal={ false }
                IngredientName={ strIngredient1 }
              />
            ))}
          </main>

          <Footer />

        </>
      )
  );
}

ExplorarComidasIngredientes.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
