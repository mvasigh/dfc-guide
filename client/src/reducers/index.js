import { combineReducers } from 'redux';
import itemsReducer from './reducer_items';
import categoriesReducer from './reducer_categories';
import guidesReducer from './reducer_guides';
import topicsReducer from './reducer_topics';

const rootReducer = combineReducers({
  items: itemsReducer,
  categories: categoriesReducer,
  guides: guidesReducer,
  topics: topicsReducer
});

export default rootReducer;
