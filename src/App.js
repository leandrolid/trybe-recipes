// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { Container } from '@mui/material';
import RecipesContextProvider from './context/RecipesContextProvider';
import {
  Bebidas, Comidas,
  DetalhesBebida,
  DetalhesComida,
  Explorar,
  ExplorarBebidas,
  ExplorarBebidasIngredientes,
  ExplorarComidas,
  ExplorarComidasArea,
  ExplorarComidasIngredientes,
  InProgressBebidas,
  InProgressComidas,
  Login,
  NotFound,
  Perfil,
  ReceitasFavoritas,
  ReceitasFeitas,
} from './pages';

import style from './styles/app.module.scss';

function App() {
  return (
    <div className={ style.container }>
      <BrowserRouter>
        <RecipesContextProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Comidas } />
            <Route exact path="/bebidas" component={ Bebidas } />
            <Route exact path="/comidas/:recipeId" component={ DetalhesComida } />
            <Route exact path="/bebidas/:recipeId" component={ DetalhesBebida } />
            <Route
              exact
              path="/comidas/:recipeId/in-progress"
              component={ InProgressComidas }
            />
            <Route
              exact
              path="/bebidas/:recipeId/in-progress"
              component={ InProgressBebidas }
            />
            <Route exact path="/explorar" component={ Explorar } />
            <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
            <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ ExplorarComidasIngredientes }
            />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ ExplorarBebidasIngredientes }
            />
            <Route
              exact
              path="/explorar/comidas/area"
              component={ ExplorarComidasArea }
            />
            <Route
              exact
              path="/explorar/bebidas/area"
              component={ NotFound }
            />
            <Route exact path="/perfil" component={ Perfil } />
            <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
            <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          </Switch>
        </RecipesContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
