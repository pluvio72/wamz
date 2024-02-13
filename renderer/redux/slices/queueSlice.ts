import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const queueSlice = createSlice({
  name: 'queue',
  initialState: [],
  reducers: {
    queueItems(state, action) {
      console.log("QUEUEING ITEMS")
      state.push(...action.payload.items)
    },
    removeFromQueue(state) {
      // state.splice(0, 1)
      console.log("REMOVING")
      state.shift()
    },
    [HYDRATE](state, action) {
      return { ...state, ...action.payload }
    }
  },
})

export const { removeFromQueue, queueItems } = queueSlice.actions
export default queueSlice.reducer