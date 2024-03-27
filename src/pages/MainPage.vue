<script setup lang="ts">
import BreadcrumbsComponent from '../components/BreadcrumbsComponent.vue';
import BaseSelect from '../components/BaseSelect.vue';
import ItemCard from '../components/ItemCard.vue';
import IItem from '../models/ItemModel';
import materialsData from '../data/materials.json';
import sortData from '../data/price.json';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

interface IBreadcrumb {
  text: string;
  href: string;
  active: boolean;
}

export interface ISelectData {
  id: string;
  name: string;
}

const items = computed((): Array<IItem> => store.getters.getItems);
const materials = computed((): Array<ISelectData> => materialsData);
const sorting = computed((): Array<ISelectData> => sortData);

const breadcrumbsItems = computed(
  (): Array<IBreadcrumb> => [
    {
      text: 'Главная',
      href: '#home',
      active: false,
    },
    {
      text: 'Системы хранения',
      href: '#systems',
      active: false,
    },
    {
      text: 'Комплекты стеллажных сиситем',
      href: '#kits',
      active: true,
    },
  ],
);
</script>

<template>
  <ul class="breadcrumbs-list">
    <BreadcrumbsComponent v-for="item in breadcrumbsItems" :item="item" />
  </ul>
  <h1 class="main-title">Комплекты стеллажных систем</h1>
  <div class="select-block">
    <BaseSelect :items="sorting" label="Сортировать по:" name="sorting" />
    <BaseSelect :items="materials" label="Материал" name="filter" />
  </div>
  <ul class="item-list">
    <ItemCard v-for="item in items" :item="item" :key="item.id" />
  </ul>
</template>

<style>
.breadcrumbs-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 4px;
}
.select-block {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
.item-list {
  display: grid;
  grid-template-columns: repeat(1, 100%);
  justify-content: center;
  column-gap: 20px;
  row-gap: 20px;
}
@media screen and (min-width: 768px) {
  .select-block {
    margin-bottom: 41px;
  }
  .item-list {
    grid-template-columns: repeat(2, 49%);
  }
}
@media screen and (min-width: 1138px) {
  .item-list {
    max-width: 1098px;
    grid-template-columns: repeat(3, 336px);
  }
  .select-block {
    gap: 24px;
  }
}
@media screen and (min-width: 1920px) {
  .item-list {
    max-width: none;
    grid-template-columns: repeat(4, 336px);
    column-gap: 48px;
    row-gap: 40px;
  }
}
</style>
