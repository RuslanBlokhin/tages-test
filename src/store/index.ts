import { createStore } from 'vuex';
import IItem from '../models/ItemModel';
import data from '../data/items.json';

export default createStore({
  state: {
    items: [...data] as Array<IItem>,
  },
  // mutations: {
  //   FILTER_ITEMS(state, payload: string) {
  //     //   console.log(data);
  //     //   const newData = data.map(Object.values);
  //   },
  //   SORT_ITEMS(state, payload: string) {
  //     //   console.log(data);
  //     //   const newData = data.map(Object.values);
  //   },
  // },
  getters: {
    getItems: (state): Array<IItem> => state.items,
  },
});
