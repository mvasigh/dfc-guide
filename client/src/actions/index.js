import axios from 'axios';

export const FETCH_ITEMS = 'fetch_items';
export const FETCH_ITEM = 'fetch_item';
export const FETCH_CATEGORIES = 'fetch_categories';
export const FETCH_GUIDES = 'fetch_guides';
export const FETCH_TOPICS = 'fetch_topics';

export function fetchItems(searchTerm = '') {
  const query = searchTerm ? `?search=${searchTerm}` : '';
  const request = axios.get(`/api/items${query}`);

  return {
    type: FETCH_ITEMS,
    payload: request
  };
}

export function fetchItem(itemId) {
  const request = axios.get(`/api/items/${itemId}`);

  return {
    type: FETCH_ITEM,
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

export function fetchGuides() {
  const request = axios.get('/api/guides');

  return {
    type: FETCH_GUIDES,
    payload: request
  };
}

export function fetchTopics() {
  const request = axios.get('/api/topics');

  return {
    type: FETCH_TOPICS,
    payload: request
  };
}
