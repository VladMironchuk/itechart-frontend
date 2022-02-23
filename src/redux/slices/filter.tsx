import { createSlice } from "@reduxjs/toolkit";

export type FilterState = {
  selectedAgeFilter: string;
  selectedGenreFilter: string;
  selectedSortCriteria: string;
  selectedSortOrder: string;
};

const initialState: FilterState = {
  selectedAgeFilter: "100",
  selectedGenreFilter: "all",
  selectedSortCriteria: "gameTitle",
  selectedSortOrder: "asc",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeAgeValue(state, action) {
      const filterState = state;
      filterState.selectedAgeFilter = action.payload.age;
    },
    changeGenreValue(state, action) {
      const filterState = state;
      filterState.selectedGenreFilter = action.payload.genre;
    },
    changeSortCriteria(state, action) {
      const filterState = state;
      filterState.selectedSortCriteria = action.payload.sortCriteria;
    },
    changeSortOrder(state, action) {
      const filterState = state;
      filterState.selectedSortOrder = action.payload.sortOrder;
    },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice;
