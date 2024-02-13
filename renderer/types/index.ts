interface DBAttrs {
  _id: string
  _rev: string
}

export interface LibraryItem {
  name: string
  type: LibraryItemType
  image: string
}

export interface Movie extends LibraryItem {
  videoPath: string
}
export interface DBMovie extends Movie, DBAttrs {}

export interface Series extends LibraryItem {
  seasons: Array<{
    name: string
    episodes: Array<{
      name: string
      videoPath: string
      image?: string
      duration: string
    }>
  }>
}
export type Season = Series['seasons'][number]
export type Episode = Series['seasons'][number]['episodes'][number]
export interface DBSeries extends Series, DBAttrs {}

export type EpisodeInfo = Series['seasons'][number]['episodes'][number]

export type PDBDocument<T> = T & {
  _id: string,
  _rev: string,
}

export type LibraryItemType = "series" | "movie";

export type Channel = {
  name: string
  image: string
  items: Array<Series>
}