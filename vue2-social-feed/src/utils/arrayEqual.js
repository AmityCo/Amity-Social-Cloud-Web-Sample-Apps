export default (arr1, arr2) => {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false

  const sort1 = arr1.slice().sort()
  const sort2 = arr2.slice().sort()

  return sort1.every((e, i) => e === sort2[i])
}
