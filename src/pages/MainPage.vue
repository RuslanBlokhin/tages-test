<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import SelectItem from '../components/SelectItem.vue';
import ItemCard from '../components/ItemCard.vue';
import IItem from '../models/ItemModel';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const items = computed((): Array<IItem> => store.getters.getItems);

console.log(items.value);
</script>

<template>
  <Navbar />
  <div class="select-block">
    <SelectItem />
    <SelectItem />
  </div>
  <ul class="item-list">
    <ItemCard v-for="item in items" :item="item" :key="item.id" />
  </ul>
</template>

<style></style>
