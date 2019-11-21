import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import NotFound from '@pages/not-found';
import ScrollToTop from './scroll-to-top';

class AppRouter extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Switch>
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default connect()(AppRouter);
