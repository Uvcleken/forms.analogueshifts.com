export function toggleArr(item: string[], value: string) {
  let newArray = item;
  if (item === null) {
    newArray = [value];
  } else if (Array.isArray(item)) {
    const index = item.indexOf(value);
    if (index > -1) {
      // Value exists in the array, remove it
      newArray = newArray.filter((arr: string) => arr !== value);
    } else {
      // Value does not exist in the array, add it
      newArray = [...newArray, value];
    }
  }
  return newArray;
}
