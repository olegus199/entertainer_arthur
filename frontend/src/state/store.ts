import { configureStore } from "@reduxjs/toolkit";
import sectionHeightsReducer from "./sectionHeightsSlice";
import sectionYOffsetReducer from "./sectionYOffsetSlice";
import isInitialLoadReducer from "./isInitialLoadSlice";
import shouldScrollToReducer from "./shouldScrollToSlice";

const store = configureStore({
  reducer: {
    sectionHeights: sectionHeightsReducer,
    sectionYOffset: sectionYOffsetReducer,
    isInitialLoad: isInitialLoadReducer,
    shouldScrollTo: shouldScrollToReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
