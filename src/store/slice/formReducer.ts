import { createSlice } from '@reduxjs/toolkit';
import { FormState } from '../../models/goodsSliceModels';

const initialState: FormState = {
  deliveryMethod: '',
  isOrderPlaced: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setDeliveryMethod: (state, action) => {
      state.deliveryMethod = action.payload;
    },
    setIsOrderPlaced: (state, action) => {
      state.isOrderPlaced = action.payload;
    },
  },
});

export const { setDeliveryMethod, setIsOrderPlaced } = formSlice.actions;
export default formSlice.reducer;
