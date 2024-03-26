<script setup lang="ts">
const props = defineProps<{
  item: {
    text: string;
    href: string;
    active: boolean;
  };
}>();
</script>

<template>
  <li class="breadcrumbs-item">
    <a
      :href="!props.item.active ? props.item.href : ''"
      :class="[{ active: props.item.active }, 'breadcrumbs-item__link']"
    >
      {{ props.item.text }}
    </a>
  </li>
</template>

<style>
.breadcrumbs-item {
  position: relative;
  display: inline-block;
  color: var(--gray-text-color);
}
.breadcrumbs-item:not(:last-child)::before {
  content: '';
  position: absolute;
  right: -10px;
  top: 2px;
  width: 1px;
  height: 12px;
  transform: rotate(15deg);
  background-color: var(--gray-text-color);
}
.breadcrumbs-item__link {
  transition: color 100ms ease;
}
.breadcrumbs-item:not(:last-child) .breadcrumbs-item__link:hover {
  color: var(--main-text-color);
}
.breadcrumbs-item__link.active {
  cursor: auto;
  color: var(--main-text-color);
}
</style>
