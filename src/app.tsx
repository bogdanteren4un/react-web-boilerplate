import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Setup from './boot';

declare let module: any;

ReactDOM.render(<Setup />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
