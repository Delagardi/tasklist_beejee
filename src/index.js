import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import store from './store';
import ErrorBoundry from './components/error-boundry';
import { ProviderBeeJeeService } from './components/context-beejee-service';
import ServiceBeeJeeAPI from './services';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import Login from './components/login';

const beeJeeService = new ServiceBeeJeeAPI();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ProviderBeeJeeService value={beeJeeService}>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              component={App}
            /> 
            <Route
              path="/login"
              exact
              component={Login}
            />
            <Redirect to="/"/>
          </Switch>
        </Router>
      </ProviderBeeJeeService>
    </ErrorBoundry>
  </Provider>, document.getElementById('root'));
