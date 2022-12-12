class Vehicle {
  public drive(): void {
    console.log("ccccccc");
  }
}

class Car extends Vehicle {
  public drive(): void {
    console.log("bbbbbbbbb");
  }
}

const vehicle = new Vehicle();