import { FETCH_TOPICS } from '../actions';

export default function topicsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_TOPICS:
      return action.payload.data.topics.reduce((list, topic) => {
        list[topic._id] = topic;
        return list;
      }, {});
    default:
      return state;
  }
}
