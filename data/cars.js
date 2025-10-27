class Cars{
    brand;
    model;
    speed = 0;
    constructor (carDetails){
        this.brand = carDetails.brand;
        this.model = carDetails.model;
        this.speed = carDetails.speed ?? 0;
    }

    displayInfo(){
        return`${this.brand} ${this.model}`
    }
    go(){
        if (this.speed < 200) {
            this.speed += 5;
        }
        if (this.speed > 200) this.speed = 200;
        return `${this.displayInfo()} is moving at ${this.speed} km/hr`
    }
    brake(){
        if (this.speed > 0) {
            this.speed -= 5;
        }
        
        if (this.speed < 0) this.speed = 0;
        return `${this.displayInfo()} is moving at ${this.speed} km/hr`
    }
}
const vehicle = new Cars({ brand: 'Honda', model: 'Civic' });
console.log(vehicle)
console.log(vehicle.displayInfo())
console.log(vehicle.go())




export const carData = [
    {
     brand:'Toyota',
     model:'Corolla',
    },
    {
     brand:'Tesla',
     model:'Model 3',
    }
].map((carDetails) => {
    return new Cars(carDetails)
});
console.log(carData)
carData.map(function(car){
console.log(car.go());   // BMW M3 is moving at 5 km/h
console.log(car.go());   // BMW M3 is moving at 10 km/h
console.log(car.brake()); // BMW M3 slowed to 5 km/h
console.log(car.brake()); // BMW M3 slowed to 0 km/h
})
console.log(carData[0].go())