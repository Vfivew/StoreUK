import { createSlice } from "@reduxjs/toolkit";
import { GoodsState } from '../../models/goodsSliceModels'
import { applyFilter } from "../../components/Goods/Filter/filterUtils/applyFilter";
import { applyFilterWithFilterKey } from "../../components/Goods/Filter/filterUtils/applyFilterWithFilterKey";

const initialState: GoodsState = {
  data: null,
  type: null,
  filteredData: null,
  filterKey: null,
  activeButton: null,
  activeAdditionalFilter: [],
  prevItemId: '',
  noAdditionalFilterData: null,
  minPrice: null,
  maxPrice: null
};

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    setPrevItemId:(state, action) => {
      state.prevItemId = action.payload
    },
    resetFilter: (state) => {
      state.minPrice = null;
      state.maxPrice = null;
      state.activeAdditionalFilter = [];
      state.filteredData = state.data
    },
    setActiveButton:(state, action) => {
      state.activeButton = action.payload
    },
    setGoodsData: (state, action) => {
      state.activeAdditionalFilter = [];
      state.filterKey = null;
      state.data = action.payload;
      if (state.filterKey === null && state.activeAdditionalFilter.length === 0) {
        state.filteredData = state.data
        state.activeButton = null;
      }
    },
    setGoodsType:(state, action) => {
      state.type = action.payload;
    },
    setFilter: (state, action) => {
      const { min, max, updatedFilter } = action.payload
      state.activeAdditionalFilter = updatedFilter;
      state.minPrice = min;
      state.maxPrice = max;
      if (state.filterKey === null) {
        const chekedData = state.data
        state.filteredData = applyFilter({ min, max, updatedFilter, chekedData})
      }
      if (state.filterKey !== null) {
        const chekedData = state.noAdditionalFilterData
        state.filteredData = applyFilterWithFilterKey({ min, max, updatedFilter, chekedData,  category: state.filterKey})
      }
    },

    setFilteredGoods: (state, action) => {
      state.filterKey = action.payload; 
      if (state.data) {
        if (state.filterKey === null) {
          state.filteredData = state.data;
        } else {
          state.filteredData = {
            [state.filterKey]: state.data[state.filterKey] || null
          };
          state.noAdditionalFilterData = state.filteredData
          if ((state.minPrice && state.maxPrice) || state.activeAdditionalFilter.length > 0) {
            state.filteredData = applyFilterWithFilterKey({ min:state.minPrice, max:state.maxPrice, updatedFilter:state.activeAdditionalFilter, chekedData:state.noAdditionalFilterData, category: state.filterKey})
          }
        }
      }
    },
  },
});

export const { setFilter, resetFilter, setPrevItemId,setGoodsData, setFilteredGoods,setGoodsType,setActiveButton } = goodsSlice.actions;

export default goodsSlice.reducer;

