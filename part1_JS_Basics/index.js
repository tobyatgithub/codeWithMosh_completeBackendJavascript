console.log("Hello world");

let a = 'red';
let b = 'blue';

let t = b;
b = a;
a = t;

// console.log(a, b)

const movies = [
  { title: "a", year: 2018, rating: 4.5 },
  { title: "b", year: 2018, rating: 4.7 },
  { title: "c", year: 2018, rating: 3 },
  { title: "d", year: 2017, rating: 4.5 },
];

const result = movies
    .filter((element) => element.rating > 4 && element.year == 2018)
    .sort((a,b) => a.rating > b.rating)
    .reverse()
    .map(element => element.title)
console.log(result)