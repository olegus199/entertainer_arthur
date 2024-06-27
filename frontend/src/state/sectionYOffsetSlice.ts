import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  y_offset: number;
}

const initialState: InitialState = {
  y_offset: window.innerWidth <= 1010 ? 50 : 80,
};

const sectionYOffsetSlice = createSlice({
  name: "sectionYOffset",
  initialState: initialState,
  reducers: {
    setYOffset: (state: InitialState, action: PayloadAction<number>) => {
      state.y_offset = action.payload;
    },
  },
});

export const { setYOffset } = sectionYOffsetSlice.actions;

export default sectionYOffsetSlice.reducer;
