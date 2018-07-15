import axios from 'axios';

export const FETCH_ITEMS = 'fetch_items';
export const FETCH_CATEGORIES = 'fetch_categories';
export const FETCH_GUIDES = 'fetch_guides';
export const FETCH_TOPICS = 'fetch_topics';

export function fetchItems() {
  const request = axios.get('/api/items');

  return {
    type: FETCH_ITEMS,
    payload: request
  };
}

export function fetchCategories() {
  const request = axios.get('/api/categories');

  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}
