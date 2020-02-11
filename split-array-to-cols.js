import chunk from 'lodash/chunk'

export default function (array, colsAmount) {
  return chunk(array, Math.round(array.length / colsAmount))
}
