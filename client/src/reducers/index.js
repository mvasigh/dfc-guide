import { combineReducers } from 'redux';
import itemsReducer from './reducer_items';
import categoriesReducer from './reducer_categories';

const rootReducer = combineReducers({
  items: itemsReducer,
  categories: categoriesReducer
});

export default rootReducer;
