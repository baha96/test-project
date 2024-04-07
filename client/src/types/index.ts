export type tableItems = {
  [key: string]: tableRow
}
export type tableRow = {
  data: {
    [year: string]: number
  }
  children?: tableItems
}
export type tableSeparator = string
export type tableHeaders = number[]
