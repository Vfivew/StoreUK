import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoodsItem } from '../../models/fireStoreModels'

const initialState: GoodsItem[] = [];

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<GoodsItem[]>) => {
      return action.payload;
    },
  },
});


export const { setData } = documentsSlice.actions;
export default documentsSlice.reducer;
