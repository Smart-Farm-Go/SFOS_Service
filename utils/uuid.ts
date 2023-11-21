/* 指定位数随机数 */
export function getPlacesUID(digits: number) {
  return Math.floor(Math.random() * Math.pow(10, digits - 1));
}

/* 指定范围随机数 */
export function getRangeUID(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
