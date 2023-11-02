import { createSlice } from '@reduxjs/toolkit';
import { BasketState } from '../../models/goodsSliceModels';

const initialBasketState = JSON.parse(localStorage.getItem('basket') || '[]');

const initialState: BasketState = {
  basket: initialBasketState,
  isBasketOpen: false,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasketItem: (state, action) => {
      state.basket = action.payload;
    },
    setToogleModal: (state) => {
      state.isBasketOpen = !state.isBasketOpen;
    },
    addBasketItem: (state, action) => {
      const { quantity, item, itemId } = action.payload;
      const existingItem = state.basket.find(([, basketItem]) => basketItem.article === item.article);
      if (existingItem) {
        console.log(existingItem)
        existingItem[0] += quantity;
      } else {
        state.basket = [...state.basket, [quantity, item, itemId]];
      }
      localStorage.setItem('basket', JSON.stringify(state.basket));
    },
    updateQuantity: (state, action) => {
      const { itemForUpdate, newQuantity } = action.payload;
      const basketIndex = state.basket.findIndex(([, item]) => item.article === itemForUpdate);
      if (basketIndex !== -1) {
        state.basket[basketIndex][0] = newQuantity;
        localStorage.setItem('basket', JSON.stringify(state.basket));
      }
    },
    removeBasketItem: (state, action) => {
      const itemIdToRemove = action.payload;
      state.basket = state.basket.filter(([, item]) => item.article !== itemIdToRemove);
      localStorage.setItem('basket', JSON.stringify(state.basket));
    },
  },
});

export const { setToogleModal, addBasketItem, updateQuantity, removeBasketItem, setBasketItem } = basketSlice.actions;
export default basketSlice.reducer;
