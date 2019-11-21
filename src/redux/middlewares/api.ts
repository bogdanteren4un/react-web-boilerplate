import axios from 'axios';
import Types from '../types';
import { Store, Dispatch, Middleware } from 'redux';

const baseUrl = 'http://domen.com';

const middleware = (store: Store<IStore>) => (next: Dispatch) => async (action: IAction<any>) => {
  next(action);

  if (action.type === Types.API_REQUEST && action.meta) {
    const { method, url, onSuccess, onError } = action.meta;
    const fullUrl = baseUrl + url;

    try {
      let result = null;
      if (method === 'get') {
        result = await axios.get(fullUrl);
      } else if (method === 'post') {
        result = await axios.post(fullUrl, action.payload);
      }

      if (result) {
        store.dispatch({
          payload: result.data,
          type: onSuccess,
        });
      }
    } catch (error) {
      store.dispatch({
        payload: error.message,
        type: onError,
      });
    }
  }
};

export default middleware as Middleware;
