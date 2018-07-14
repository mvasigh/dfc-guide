import { FETCH_ITEMS } from '../actions';

export default function postsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload.data.items.reduce((list, item) => {
        list[item._id] = item;
        return list;
      }, {});
    default:
      return state;
  }
}
