import { FETCH_GUIDES } from '../actions';

export default function guidesReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_GUIDES:
      return action.payload.data.guides.reduce((list, guide) => {
        list[guide._id] = guide;
        return list;
      }, {});
    default:
      return state;
  }
}
