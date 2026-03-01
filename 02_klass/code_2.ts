class Product {
    name: string;
    price: number;
    stock: number;

    constructor(name: string, price: number, stock: number) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    sell(quantity: number): void {
        if (quantity <= this.stock) {
            this.stock -= quantity;
            console.log(`${quantity} ${this.name} sold.`);
        } else {
            console.log(`Not enough ${this.name} in stock.`);
        }
    }

    restock(quantity: number): void {
        this.stock += quantity;
        console.log(`${quantity} ${this.name} added to stock.`);
    }

    getInfo(): string {
        return `${this.name} - Price: €${this.price}, Stock: ${this.stock}`;
    }
}
const iphone = new Product("'iPhone 15'", 999, 10);
const samsung = new Product("'Samsung Galaxy S24'", 899, 5);

// demo 1
iphone.sell(2);
iphone.restock(3);

// demo 2
samsung.sell(1);
samsung.sell(10); // Not enough stock

console.log(iphone.getInfo());
console.log(samsung.getInfo());