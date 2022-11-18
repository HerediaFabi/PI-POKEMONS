let array = [
  1, 9, 3, 7, 5, 4, 8,
  // "2022-11-17T18:35:32.533Z",
  // "2022-11-17T18:28:34.450Z",
  //   "2022-11-17T18:34:30.432Z",
  //   "2022-11-17T18:36:30.325Z",
];
var hoy = new Date();

let ordenado = array
  .sort((a, b) => {
    // if (typeof a !== typeof b) return 1;
    return a - b;
  })
  .reverse();

console.log(ordenado);

let text = "max_attack";
console.log(text.slice(4));

console.log(Boolean(["4", "10"].length));

var array2 = ["a", "b", "c"],
  i = 0;

for (var i = 0; i < array2.length; i++) {
  array2[i] = array2[i].replace("", " ");
}

console.log("Hola" + array2);
