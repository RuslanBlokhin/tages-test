<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { ISelectData } from '../pages/MainPage.vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps<{
  items: Array<ISelectData>;
  label: string;
  name: string;
}>();

const isOptionsOpen: Ref<boolean> = ref(false);
const currentOption: Ref<string | null> = ref(null);

const onOptionClick = (event: Event) => {
  currentOption.value = (event.target as HTMLElement).textContent;

  if ((event.target as HTMLElement).id === '1')
    store.commit(props.name === 'sorting' ? 'SORT_ITEMS' : 'FILTER_ITEMS', 1);
  if ((event.target as HTMLElement).id === '2')
    store.commit(props.name === 'sorting' ? 'SORT_ITEMS' : 'FILTER_ITEMS', 2);

  isOptionsOpen.value = false;
};

const closeSelect = (event: Event) => {
  if (!(event.target as HTMLElement).closest('.select__wrapper')) {
    isOptionsOpen.value = false;
  }
};

const vClickOutside = {
  beforeMount() {
    document.body.addEventListener('click', closeSelect);
  },
  unmounted() {
    document.body.removeEventListener('click', closeSelect);
  },
};
</script>

<template>
  <div class="select">
    <div class="select__label">{{ props.label }}</div>
    <div class="select__wrapper">
      <div @click="isOptionsOpen = !isOptionsOpen" class="select__header">
        <div class="select__header-text">{{ currentOption }}</div>
        <div :class="[{ active: isOptionsOpen }, 'select__header-icon']" class="select__header-icon">
          <img src="/icons/arrow.svg" alt="arrow" />
        </div>
      </div>
      <ul v-if="isOptionsOpen" v-click-outside class="select__list">
        <li v-for="item in props.items" :key="item.id" :id="item.id" @click="onOptionClick" class="select__option">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.select {
  width: 100%;
  max-width: 288px;
}
.select__wrapper {
  position: relative;
  background-color: rgb(242, 242, 242);
}
.select__label {
  margin: 0 0 4px 16px;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 3%;
  color: rgb(79, 79, 79);
}
.select__list {
  position: absolute;
  width: 100%;
  top: 40px;
  left: 0;
  padding: 10px 16px;
  background-color: rgb(242, 242, 242);
  box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.2);
  z-index: 3;
}
.select__option:not(:last-child) {
  margin-bottom: 10px;
}
.select__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 16px 10px;
  height: 40px;
  cursor: pointer;
}
.select__header-icon {
  height: 24px;
  transition: transform 150ms ease;
}
.select__header-icon.active {
  transform: rotate(-180deg);
}
</style>
