import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers<IStore>({
  form
});

export default rootReducer;
