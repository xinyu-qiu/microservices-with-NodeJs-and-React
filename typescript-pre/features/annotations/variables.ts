let apples: number = 5;
let speed: string = 'fast';
let hasName: boolean = true;

let nothing: null = null;

let now: Date = new Date();

let colors: string[] = ['red', 'yellow'];

let point: {x: number; y: number} = {
  x: 10,
  y: 10
};

const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};

const json = '{"x": 10, "y": 20}';
const coordinates: { x: number; y: number } = JSON.parse(json);
console.log(coordinates);

let words = ['red', 'green', 'blue'];
let foundWord = false;

for (let i = 0; i < words.length; ++i) {
  if (words[i] === 'green') {
    foundWord = true;
  }
}


let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < words.length; ++i) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}