import * as React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps
} from 'react-router-dom';

const renderFn = Symbol('renderFn');

type Props = RouteProps & {
  condition: boolean;
  redirectTo: string;
  availableRules?: boolean;
}

class ConditionalRoute extends React.Component<Props> {
  render() {
    const { component: Component, condition, redirectTo, ...rest } = this.props;
    return <Route {...rest} render={this[renderFn]} />;
  }

  [renderFn] = (renderProps: RouteComponentProps<any>) => {
    const { component: Component } = this.props;

    if (this.props.condition) {
      if (!Component) {
        return null;
      }

      return <Component {...renderProps} />;
    } else {
      return <Redirect to={this.props.redirectTo} />;
    }
  };
}

export default ConditionalRoute;
