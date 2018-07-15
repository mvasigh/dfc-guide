import { FETCH_ITEMS, FETCH_ITEM } from '../actions';

export default function itemsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload.data.items.reduce((list, item) => {
        list[item._id] = item;
        return list;
      }, {});
    case FETCH_ITEM:
      return {
        ...state,
        [action.payload.data._id]: action.payload.data
      };
    default:
      return state;
  }
}
