/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './../HomePage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Navbar from './../../components/Navbar';
import GlobalStyle from '../../global-styles';
import Cart from './../Cart';
import checkout from './../Checkout';
export default function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/viewcart" component={Cart} />
        <Route exact path="/checkout" component={checkout} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
