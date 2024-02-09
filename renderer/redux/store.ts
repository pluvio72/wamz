import { configureStore } from "@reduxjs/toolkit";
import queueReducer from "./slices/queueSlice";
import { createWrapper } from "next-redux-wrapper";

const store = configureStore({
  reducer: {
    queue: queueReducer
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const wrapper = createWrapper(() => store, { debug: true })