<script setup lang="ts">
import IItem from '../models/ItemModel';

const props = defineProps<{
  item: IItem;
}>();
console.log(props.item);
</script>

<template></template>

<style></style>
