import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SectionHeights } from "../types";

interface InitialState {
  heights: SectionHeights;
}

const initialState: InitialState = {
  heights: {
    about: 0,
    contacts: 0,
    gallery: 0,
    hero: 0,
  },
};

const sectionHeightsSlice = createSlice({
  name: "sectionHeigths",
  initialState: initialState,
  reducers: {
    setSectionHeights: (
      state: InitialState,
      action: PayloadAction<SectionHeights>
    ) => {
      state.heights = action.payload;
    },
  },
});

export const { setSectionHeights } = sectionHeightsSlice.actions;

export default sectionHeightsSlice.reducer;
