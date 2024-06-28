import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SectionNames } from "../types";

interface InitialState {
  shouldScrollTo: SectionNames | null;
}

const initialState: InitialState = {
  shouldScrollTo: null,
};

const shouldeScrollToSlice = createSlice({
  name: "shouldScrollTo",
  initialState: initialState,
  reducers: {
    setShouldScrollTo: (
      state: InitialState,
      action: PayloadAction<SectionNames | null>
    ) => {
      state.shouldScrollTo = action.payload;
    },
  },
});

export const { setShouldScrollTo } = shouldeScrollToSlice.actions;

export default shouldeScrollToSlice.reducer;
