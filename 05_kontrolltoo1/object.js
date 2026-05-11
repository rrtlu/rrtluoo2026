const Substance = require('./substance');

class Object {
    constructor(mass, temperature, substance) {
        if (!(substance instanceof Substance)) {
            throw new Error('Substance must be an instance of Substance class');
        }
        this.mass = mass; // kg
        this.temperature = temperature; // K
        this.substance = substance;
    }

    getMass() {
        return this.mass;
    }

    getTemperature() {
        return this.temperature;
    }

    getSubstance() {
        return this.substance;
    }

    setMass(mass) {
        this.mass = mass;
    }

    setTemperature(temperature) {
        this.temperature = temperature;
    }

    toString() {
        return `Mass: ${this.mass} kg, Temperature: ${this.temperature} K, Substance: ${this.substance.getName()}`;
    }
}

module.exports = Object;