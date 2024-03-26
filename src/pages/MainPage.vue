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
  <ul class="select-block">
    <BaseSelect :items="sorting" label="Сортировать по:" />
    <BaseSelect :items="materials" label="Материал" />
  </ul>
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
}
</style>
