import React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import AppRouter from '../router'
import configureStore from './store'
import history from '../services/history'
import { setStore } from '../services/store'

import '@styles/main.scss'

type State = {
  persistor: any
  isLoading: boolean
  store: Store<IStore>
}

type Props = {}

export default class Setup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const { store, persistor } = configureStore(() =>
      this.setState({ isLoading: false })
    )

    setStore(store)

    this.state = {
      isLoading: false,
      persistor,
      store,
    }
  }

  render() {
    return (
      <PersistGate loading={null} persistor={this.state.persistor}>
        <Router history={history}>
          <Provider store={this.state.store}>
            <AppRouter />
          </Provider>
        </Router>
      </PersistGate>
    )
  }
}
