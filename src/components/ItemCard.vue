<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import IItem from '../models/ItemModel';

const props = defineProps<{
  item: IItem;
}>();

const inCart: Ref<boolean> = ref(false);
const isLiked: Ref<boolean> = ref(false);
const imgURL: Ref<string> = ref(createDynamicURL(props.item.image.url));

function createDynamicURL(url: string): string {
  return new URL(url, import.meta.url).href;
}

function addToLocalStorage(event: Event) {
  const currId: string = (event.currentTarget as HTMLElement).id;
  const nameBtn: string = (event.currentTarget as HTMLButtonElement).name;
  const prevIds: string | null = localStorage.getItem(nameBtn);

  if (prevIds && prevIds.includes(currId)) return;

  let ids: string = '';
  prevIds ? (ids = prevIds + ' ' + currId) : (ids = currId);
  localStorage.setItem(nameBtn, ids);

  nameBtn === 'cart' ? (inCart.value = true) : (isLiked.value = true);
}

onMounted(() => {
  const cartIds: string | null = localStorage.getItem('cart');
  const likeIds: string | null = localStorage.getItem('like');
  if (cartIds && cartIds.includes(props.item.id)) inCart.value = true;
  if (likeIds && likeIds.includes(props.item.id)) isLiked.value = true;
});
</script>

<template>
  <li class="item-card">
    <div v-if="props.item.price.old_price" class="item-card__promo">Скидка</div>
    <div class="item-card__image-wrapper">
      <img :src="imgURL" :alt="props.item.name" />
    </div>
    <div class="item-card__info">
      <div class="item-card__code">{{ props.item.code }}</div>
      <h2 class="item-card__name">{{ props.item.name }}</h2>
      <div class="item-card__details">
        <div class="item-card__price">
          <div v-if="props.item.price.old_price" class="item-card__old-price">
            {{ Math.trunc(props.item.price.old_price) }}₽
          </div>
          <div class="item-card__current-price">{{ Math.trunc(props.item.price.current_price) }}₽</div>
        </div>
        <div class="item-card__buttons">
          <button @click="addToLocalStorage" class="item-card__cart-btn" :id="props.item.id" name="cart">
            <img
              :src="inCart ? createDynamicURL('/icons/checked.svg') : createDynamicURL('/icons/cart.svg')"
              alt="icon"
              class="item-card__cart-btn-img"
            />
          </button>
          <button @click="addToLocalStorage" class="item-card__like-btn" :id="props.item.id" name="like">
            <svg
              :class="[{ active: isLiked }, 'item-card__like-icon']"
              width="21"
              height="21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M-.8-.8h21.6v21.6H-.8z" />
              <path
                d="M10.992 1.626c.963-.47 1.803-.626 3.106-.626 3.334.014 5.802 2.826 5.802 6.408 0 2.734-1.524 5.375-4.364 7.929-1.49 1.34-3.393 2.667-4.756 3.373l-.78.403-.78-.403c-1.363-.706-3.266-2.033-4.756-3.373C1.624 12.783.1 10.142.1 7.407.1 3.788 2.545 1 5.91 1c1.255 0 2.138.17 3.12.655.341.17.662.37.961.601.31-.245.645-.455 1.001-.63ZM18.1 7.408c0 2.142-1.272 4.346-3.768 6.59-1.36 1.224-3.109 2.447-4.332 3.088-1.223-.641-2.972-1.864-4.332-3.087C3.172 11.754 1.9 9.55 1.9 7.408 1.9 4.733 3.595 2.8 5.91 2.8c.998 0 1.613.118 2.322.469.418.207.788.48 1.108.821l.662.707.656-.712a3.776 3.776 0 0 1 1.126-.842c.687-.336 1.264-.443 2.31-.443 2.285.01 4.006 1.97 4.006 4.608Z"
                clip-rule="evenodd"
                fill="#000"
                fill-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<style>
.item-card {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  padding: 10px 14px 10px 12px;
  border: 1px solid #eee;
}
.item-card__promo {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 8px;
  left: 0;
  width: 81px;
  height: 24px;
  color: #fff;
  background-color: rgb(235, 87, 87);
  font-family: 'SF Pro Display', sans-serif;
  font-size: 14px;
  line-height: 1.3;
  font-weight: 500;
}
.item-card__image-wrapper {
  width: 238px;
  margin: 0 auto 23px;
}
.item-card__code {
  margin-bottom: 5.83px;
  font-size: 10px;
  color: rgb(136, 136, 136);
}
.item-card__name {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.4;
  letter-spacing: 2%;
}
.item-card__details,
.item-card__price,
.item-card__buttons {
  display: flex;
  align-items: center;
}
.item-card__details {
  justify-content: space-between;
}
.item-card__price {
  column-gap: 9.14px;
}
.item-card__buttons {
  column-gap: 11px;
}
.item-card__old-price {
  text-decoration: line-through;
  color: rgb(136, 136, 136);
}
.item-card__like-icon.active path:last-child {
  fill-rule: nonzero;
}
.item-card__buttons button {
  width: 36px;
  height: 36px;
}
.item-card__cart-btn-img {
  width: 21px;
}
</style>
