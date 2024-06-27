import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isInitial: boolean;
}

const initialState: InitialState = {
  isInitial: true,
};

const isInitialLoadSlice = createSlice({
  name: "isInitial",
  initialState: initialState,
  reducers: {
    setIsInitial: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isInitial = action.payload;
    },
  },
});

export const { setIsInitial } = isInitialLoadSlice.actions;

export default isInitialLoadSlice.reducer;
