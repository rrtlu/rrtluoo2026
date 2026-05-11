const readline = require('readline');
const Substance = require('./substance');
const ObjectClass = require('./object'); // renamed to avoid conflict with Object
const Collection = require('./collection');

///========================
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let substances = [
    new Substance('Water', 4184, 1000),
    new Substance('Aluminum', 896, 2700),
    new Substance('Iron', 449, 7874)
];

let objects = [
    new ObjectClass(1.0, 300, substances[0]),
    new ObjectClass(0.5, 350, substances[1]),
    new ObjectClass(2.0, 280, substances[2])
];

let collection = new Collection();

///========================
async function mainMenu() {
    while (true) {
        console.log('\n=== Main Menu ===');
        console.log('1. Manage Substances');
        console.log('2. Manage Objects');
        console.log('3. Manage Collection');
        console.log('4. Exit');
        const choice = await ask('Choose an option: ');
        switch (choice) {
            case '1':
                await manageSubstances();
                break;
            case '2':
                await manageObjects();
                break;
            case '3':
                await manageCollection();
                break;
            case '4':
                rl.close();
                return;
            default:
                console.log('Invalid choice');
                await wait(3000);
        }
    }
}

///========================
async function manageSubstances() {
    while (true) {
        console.log('\n=== Substances ===');
        substances.forEach((sub, index) => console.log(`${index}: ${sub.toString()}`));
        await wait(3000);
        console.log('=== Options ===');
        console.log('1. Add Substance');
        console.log('2. View Substance');
        console.log('3. Back');
        const choice = await ask('Choose an option: ');
        switch (choice) {
            case '1':
                await addSubstance();
                break;
            case '2':
                await viewSubstance();
                break;
            case '3':
                return;
            default:
                console.log('Invalid choice');
                await wait(3000);
        }
    }
}

///========================
async function addSubstance() {
    const name = await ask('Enter substance name: ');
    const specificHeat = parseFloat(await ask('Enter specific heat (J/(kg*K)): '));
    const density = parseFloat(await ask('Enter density (kg/m³): '));
    substances.push(new Substance(name, specificHeat, density));
    console.log('Substance added.');
    await wait(3000);
}

///========================
async function viewSubstance() {
    const index = parseInt(await ask('Enter substance index: '));
    if (index >= 0 && index < substances.length) {
        console.log(substances[index].toString());
    } else {
        console.log('Invalid index');
        await wait(3000);
    }
}

///========================
async function manageObjects() {
    while (true) {
        console.log('\n=== Objects ===');
        objects.forEach((obj, index) => console.log(`${index}: ${obj.toString()}`));
        await wait(3000);
        console.log('=== Options ===');
        console.log('1. Add Object');
        console.log('2. Edit Object');
        console.log('3. Delete Object');
        console.log('4. Query Total Mass for Substance');
        console.log('5. Back');
        const choice = await ask('Choose an option: ');
        switch (choice) {
            case '1':
                await addObject();
                break;
            case '2':
                await editObject();
                break;
            case '3':
                await deleteObject();
                break;
            case '4':
                await queryTotalMass();
                break;
            case '5':
                return;
            default:
                console.log('Invalid choice');
                await wait(3000);
        }
    }
}

///========================
async function addObject() {
    if (substances.length === 0) {
        console.log('No substances available. Add a substance first.');
        await wait(3000);
        return;
    }
    console.log('Available substances:');
    substances.forEach((sub, index) => console.log(`${index}: ${sub.getName()}`));
    const subIndex = parseInt(await ask('Enter substance index: '));
    if (subIndex < 0 || subIndex >= substances.length) {
        console.log('Invalid index');
        await wait(3000);
        return;
    }
    const mass = parseFloat(await ask('Enter mass (kg): '));
    const temperature = parseFloat(await ask('Enter temperature (K): '));
    objects.push(new ObjectClass(mass, temperature, substances[subIndex]));
    console.log('Object added.');
    await wait(3000);
}

///========================
async function editObject() {
    const index = parseInt(await ask('Enter object index to edit: '));
    if (index < 0 || index >= objects.length) {
        console.log('Invalid index');
        await wait(3000);
        return;
    }
    const obj = objects[index];
    console.log('Current:', obj.toString());
    const mass = parseFloat(await ask('Enter new mass (kg): '));
    const temperature = parseFloat(await ask('Enter new temperature (K): '));
    obj.setMass(mass);
    obj.setTemperature(temperature);
    console.log('Object updated.');
    await wait(3000);
}

///========================
async function deleteObject() {
    const index = parseInt(await ask('Enter object index to delete: '));
    if (index < 0 || index >= objects.length) {
        console.log('Invalid index');
        await wait(3000);
        return;
    }
    objects.splice(index, 1);
    console.log('Object deleted.');
    await wait(3000);
}

///========================
async function queryTotalMass() {
    if (substances.length === 0) {
        console.log('No substances available.');
        await wait(3000);
        return;
    }
    console.log('Available substances:');
    substances.forEach((sub, index) => console.log(`${index}: ${sub.getName()}`));
    const subIndex = parseInt(await ask('Enter substance index: '));
    if (subIndex < 0 || subIndex >= substances.length) {
        console.log('Invalid index');
        await wait(3000);
        return;
    }
    const totalMass = objects.reduce((sum, obj) => {
        if (obj.getSubstance() === substances[subIndex]) {
            return sum + obj.getMass();
        }
        return sum;
    }, 0);
    console.log(`Total mass for ${substances[subIndex].getName()}: ${totalMass} kg`);
    await wait(3000);
}

///========================
async function manageCollection() {
    while (true) {
        console.log('\n=== Collection ===');
        console.log(collection.toString());
        await wait(3000);
        console.log('=== Options ===');
        console.log('1. Add Object to Collection');
        console.log('2. Remove Object from Collection');
        console.log('3. Calculate Equilibrium Temperature');
        console.log('4. Back');
        const choice = await ask('Choose an option: ');
        switch (choice) {
            case '1':
                await addToCollection();
                break;
            case '2':
                await removeFromCollection();
                break;
            case '3':
                const eqTemp = collection.getEquilibriumTemperature();
                console.log(`Equilibrium temperature: ${eqTemp} K`);
                await wait(3000);
                break;
            case '4':
                return;
            default:
                console.log('Invalid choice');
                await wait(3000);
        }
    }
}

///========================
async function addToCollection() {
    if (objects.length === 0) {
        console.log('No objects available. Add an object first.');
        await wait(3000);
        return;
    }
    console.log('Available objects:');
    objects.forEach((obj, index) => console.log(`${index}: ${obj.toString()}`));
    const objIndex = parseInt(await ask('Enter object index to add: '));
    if (objIndex < 0 || objIndex >= objects.length) {
        console.log('Invalid index');
        await wait(3000);
        return;
    }
    collection.addObject(objects[objIndex]);
    console.log('Object added to collection.');
    await wait(3000);
}

///========================
async function removeFromCollection() {
    const index = parseInt(await ask('Enter collection index to remove: '));
    try {
        collection.removeObject(index);
        console.log('Object removed from collection.');
        await wait(3000);
    } catch (e) {
        console.log(e.message);
        await wait(3000);
    }
}

///========================
mainMenu();