let array = [
  1,
  9,
  3,
  7,
  5,
  4,
  8,
  "2022-11-17T18:35:32.533Z",
  "2022-11-17T18:28:34.450Z",
  //   "2022-11-17T18:34:30.432Z",
  //   "2022-11-17T18:36:30.325Z",
];
var hoy = new Date();

let ordenado = array.sort((a, b) => {
  if (typeof a !== typeof b) return 1;
  if (typeof a === "number") return a - b;
  return new Date(a) - new Date(b);
});

console.log(ordenado);
