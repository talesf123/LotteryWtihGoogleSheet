
// function onlyUnique(value, index, self) {
//   return self.indexOf(value) === index;
// }
onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}
mask = (str) => {
  return `${str.slice(0, 4)}xxx${str.slice(7)}`;
}
// 取亂數 fn
r = (max) => {
  min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

spin_style = (count) => {
  var style_str;
  ind = count - 1;
  style_str = [
    `@-webkit-keyframes spin-${ind}{from{top:0}to{top:calc(-73px * ${ind})}}`,
    `@keyframes spin-${ind}{from{top:0}to{top:calc(-73px * ${ind})}}.god .wrap>.span-${ind}`,
    `{-webkit-animation-name:spin-${ind};animation-name:spin-${ind};`,
    `-webkit-animation-duration:${0.03 * ind}s;animation-duration:${0.03 * ind}s}\n`
  ].join('');
  return style_str
}