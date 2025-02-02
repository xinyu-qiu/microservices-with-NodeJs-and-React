interface Vehicle {
  name: string;
  year: number;
  broken: boolean;
}

const oldCiv = {
  name: 'civic',
  year: 2000,
  broken: true
};

const printVehicle = (vehicle: Vehicle): void => {
  console.log(`Name: ${vehicle.name}`);
};

printVehicle(oldCiv);