const Object = require('./object');

class Collection {
    constructor() {
        this.objects = [];
    }

    addObject(obj) {
        if (!(obj instanceof Object)) {
            throw new Error('Object must be an instance of Object class');
        }
        this.objects.push(obj);
    }

    removeObject(index) {
        if (index >= 0 && index < this.objects.length) {
            this.objects.splice(index, 1);
        } else {
            throw new Error('Invalid index');
        }
    }

    getObjects() {
        return this.objects;
    }

    getTotalMassForSubstance(substance) {
        let totalMass = 0;
        for (let obj of this.objects) {
            if (obj.getSubstance() === substance) {
                totalMass += obj.getMass();
            }
        }
        return totalMass;
    }

    getEquilibriumTemperature() {
        if (this.objects.length === 0) {
            return 0;
        }
        let totalHeat = 0;
        let totalCapacity = 0;
        for (let obj of this.objects) {
            let capacity = obj.getMass() * obj.getSubstance().getSpecificHeat();
            totalHeat += capacity * obj.getTemperature();
            totalCapacity += capacity;
        }
        return totalHeat / totalCapacity;
    }

    toString() {
        return this.objects.map((obj, index) => `${index}: ${obj.toString()}`).join('\n');
    }
}

module.exports = Collection;