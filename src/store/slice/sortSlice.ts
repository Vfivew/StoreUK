import { createSlice } from "@reduxjs/toolkit";
import { SortState } from '../../models/goodsSliceModels';

const initialState: SortState = {
  allGoods: null,
  activeButton: null,
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortData: (state, action) => {
      state.allGoods = action.payload;
      //state.activeButton = null; 
    },
    setActiveButton: (state, action) => {
      state.activeButton = action.payload;
    },
    setSortType: (state, action) => {
      const sortType = action.payload;
      if (state.allGoods && sortType === 'Від дешевих') {
        if (Array.isArray(state.allGoods)) {
          state.allGoods.sort((a, b) => {
            const priceA = parseFloat(a.price || a.article?.price || '0');
            const priceB = parseFloat(b.price || b.article?.price || '0');
            return priceA - priceB;
          });
        }
      } else if (state.allGoods && sortType === 'Від дорожчих') {
        if (Array.isArray(state.allGoods)) {
          state.allGoods.sort((a, b) => {
            const priceA = parseFloat(a.price || a.article?.price || '0');
            const priceB = parseFloat(b.price || b.article?.price || '0');
            return priceB - priceA;
          });
        }
      } else if (state.allGoods && sortType === 'За рейтингом') {
        if (Array.isArray(state.allGoods)) {
          state.allGoods.sort((a, b) => {
            const ratingA = a.rating ? a.rating.length : 0;
            const ratingB = b.rating ? b.rating.length : 0;
            return ratingB - ratingA;
          });
        }
      }
    },
  },
});

export const { setSortData, setSortType, setActiveButton} = sortSlice.actions;

export default sortSlice.reducer;
