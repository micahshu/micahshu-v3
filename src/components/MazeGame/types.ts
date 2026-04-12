export type TileType =
  | 'empty'
  | 'wall'
  | 'dark-wall'
  | 'light-wall'
  | 'switch'
  | 'start'
  | 'end'

export type Position = { row: number; col: number }

export interface Level {
  grid: TileType[][]
  start: Position
  end: Position
}
