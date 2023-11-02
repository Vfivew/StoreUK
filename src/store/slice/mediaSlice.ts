import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortMenuActive: false,
  filterMenuActive: false,
  navBurgerActive: false,
  headerBurgerActive:false,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setSortMenuActive: (state, action) => {
      state.sortMenuActive = action.payload;
      state.filterMenuActive = false;
      state.navBurgerActive = false;
      state.headerBurgerActive = false;
    },
    setFilterMenuActive: (state, action) => {
      state.filterMenuActive = action.payload;
      state.sortMenuActive = false;
      state.navBurgerActive = false;
      state.headerBurgerActive = false;
    },
    setNavBurgerActive: (state, action) => {
      state.navBurgerActive = action.payload;
      state.sortMenuActive = false;
      state.filterMenuActive = false;
      state.headerBurgerActive = false;
    },
    setHeaderBurgerActive: (state, action) => {
      state.headerBurgerActive = action.payload;
      state.sortMenuActive = false;
      state.filterMenuActive = false;
      state.navBurgerActive = false;
    },
  },
});


export const { setSortMenuActive,setFilterMenuActive,setNavBurgerActive,setHeaderBurgerActive } = mediaSlice.actions;
export default mediaSlice.reducer;
