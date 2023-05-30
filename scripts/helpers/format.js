export function arrToParts(arr, num) {
  let result = [];
  for (var i = 0; i < arr.length; i += num) {
    result.push(arr.slice(i, i + num));
  }
  return result;
}
