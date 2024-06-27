import { configureStore } from "@reduxjs/toolkit";
import sectionHeightsReducer from "./sectionHeightsSlice";
import sectionYOffsetReducer from "./sectionYOffsetSlice";
import isInitialLoadReducer from "./isInitialLoadSlice";

const store = configureStore({
  reducer: {
    sectionHeights: sectionHeightsReducer,
    sectionYOffset: sectionYOffsetReducer,
    isInitialLoad: isInitialLoadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
