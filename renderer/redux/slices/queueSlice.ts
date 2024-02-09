import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const queueSlice = createSlice({
  name: 'queue',
  initialState: [],
  reducers: {
    itemQueued(state, action) {
      state.push({
        name: action.payload.name,
        image: action.payload.image,
        videoPath: action.payload.videoPath,
        duration: action.payload.duration
      })
    },
    queueItems(state, action) {
      state.push(action.payload.items)
    },
    itemRemoved(state, action) {
      state.shift()
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', state, action.payload)
      return {
        ...state,
        ...action.payload.subject
      }
    }
  }
})

export const { itemQueued, itemRemoved, queueItems } = queueSlice.actions
export default queueSlice.reducer