import { createStore } from 'vuex';
import IItem from '../models/ItemModel';
import data from '../data/items.json';

export default createStore({
  state: {
    items: [...data] as Array<IItem>,
  },
  mutations: {
    FILTER_ITEMS(state, payload: 1 | 2) {
      state.items = data.filter(item => item.material === payload) as Array<IItem>;
    },
    SORT_ITEMS(state, payload: 1 | 2) {
      payload === 1
        ? (state.items = state.items.sort((a, b) => a.price.current_price - b.price.current_price))
        : (state.items = state.items.sort((a, b) => b.price.current_price - a.price.current_price));
    },
  },
  getters: {
    getItems: (state): Array<IItem> => state.items,
  },
});
