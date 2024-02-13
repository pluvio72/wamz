import { Channel, Season, Series } from "../types";
import { queueItems } from "../redux/slices/queueSlice";
import { AppDispatch } from "../redux/store";

export const getChannelQueue = (dispatch: AppDispatch, channel: Channel) => {
  // const firstChannel = dispatch(queueItems({}))
}

export const getSeriesQueue = (dispatch: AppDispatch, season: Season, episode: number) => {
  if (season.episodes.length - 1 >= episode) {
    dispatch(queueItems({ items: season.episodes.slice(episode) }))
  }
}