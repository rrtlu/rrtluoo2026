class Substance {
    constructor(name, specificHeat, density) {
        this.name = name;
        this.specificHeat = specificHeat; // J/(kg*K)
        this.density = density; // kg/m³
    }

    getName() {
        return this.name;
    }

    getSpecificHeat() {
        return this.specificHeat;
    }

    getDensity() {
        return this.density;
    }

    toString() {
        return `${this.name}: specific heat ${this.specificHeat} J/(kg*K), density ${this.density} kg/m³`;
    }
}

module.exports = Substance;