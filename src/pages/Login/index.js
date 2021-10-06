/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { TextField } from '@mui/material';
// import LoginIcon from '@mui/icons-material/Login';
// import Logo from '../../images/logo.svg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import style from './login.module.scss';
import RecipesContext from '../../context/RecipesContext';
import Loading from '../../components/Loading';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [randomMeal, setRandomMeal] = useState({});

  const { isLoading, setIsLoading } = useContext(RecipesContext);

  const verifyEmail = (testEmail) => {
    const emailValidation = /\S+@\S+\.\S+/;
    if (emailValidation.test(testEmail)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const verifyPassword = (testPassword) => {
    const minimumLength = 6;
    if (testPassword.length > minimumLength) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value);
      verifyEmail(target.value);
    }

    if (target.name === 'password') {
      setPassword(target.value);
      verifyPassword(target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // O preventDefault() não deixa a página atualizar (renderizar de novo)
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  useEffect(() => {
    const fetchRandomMeal = async () => {
      await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((response) => response.json())
        .then(({ meals: [meal] }) => {
          setRandomMeal(meal);
          setIsLoading(false);
        });
    };
    fetchRandomMeal();
  }, [setIsLoading]);

  return (
    isLoading
      ? <Loading />
      : (
        <main
          className={ style.container }
          style={ { backgroundImage: `url(${randomMeal.strMealThumb})` } }
        >
          {/* <div className="logo"> */}
          {/* <img className="logo-image" src={ Logo } alt="logo" /> */}
          {/* </div> */ }
          <div className={ style.formBackground }>
            <form onSubmit={ handleSubmit }>
              <h1>
                As melhores receitas na palma da sua mão.
              </h1>
              <h2>
                Na imagem:
                {' '}
                {randomMeal.strMeal}
              </h2>
              <input
                id="name-text-input"
                placeholder="Email"
                name="email"
                onChange={ handleChange }
                value={ email }
                type="email"
                data-testid="email-input"
              />
              <input
                id="password-text-field"
                placeholder="Password"
                name="password"
                onChange={ handleChange }
                value={ password }
                type="password"
                data-testid="password-input"
              />
              <button
                data-testid="login-submit-btn"
                disabled={ !validEmail || !validPassword }
                type="submit"
              >
                <span><ArrowForwardIcon /></span>
                <span>Entrar</span>
              </button>
            </form>
          </div>
        </main>
      )
  );
}

Login.propTypes = {
  history: PropTypes.shape(),
}.isRequired;
