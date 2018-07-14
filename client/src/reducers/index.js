import { combineReducers } from 'redux';
import itemsReducer from './reducer_items';

const rootReducer = combineReducers({
  items: itemsReducer
});

export default rootReducer;
