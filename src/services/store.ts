import { Store } from 'redux';

let store: Store<IStore>;

export const setStore = (newStore: Store<IStore>) => (store = newStore);

export const getState = () => {
  return (store && store.getState()) || {};
};

export const dispatch = <T>(action: IAction<T>) => {
  return (store && store.dispatch(action)) || undefined;
};

export default {
  dispatch,
  getState,
  setStore,
};
