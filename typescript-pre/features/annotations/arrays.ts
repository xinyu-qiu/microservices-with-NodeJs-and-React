const carMakers: string[] = ['ford', 'toyota', 'chevy'];
const dates = [new Date(), new Date()];

const carsByMake: string[][] = [
  ['f150'],
  ['corolla']
];

const car = carMakers[0];
const myCar = carMakers.pop();

carMakers.push('abc');

carMakers.map((car: string): string => {
  return car.toUpperCase();
});

const importantDates = [new Date(), '2020'];
importantDates.push(new Date());
importantDates.push("new");


