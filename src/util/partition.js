export function partition(arr, filter) {
  const included = []
  const excluded = []

  arr.forEach(item => filter(item) ? included.push(item) : excluded.push(item))
  return [included, excluded]
}