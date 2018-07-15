import { FETCH_CATEGORIES } from '../actions';

export default function categoriesReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload.data.categories.reduce((list, cat) => {
        list[cat._id] = cat;
        return list;
      }, {});
    default:
      return state;
  }
}
