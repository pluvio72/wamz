export interface LibraryItem {
  name: string
  type: LibraryItemType
  image: string
}

export interface Movie extends LibraryItem {
  videoPath: string
}

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

export type EpisodeInfo = Series['seasons'][number]['episodes'][number]

export type PDBDocument<T> = T & {
  _id: string,
  _rev: string,
}

export type LibraryItemType = "series" | "movie";