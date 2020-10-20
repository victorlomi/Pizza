// Pizza object that handles storing qll 
// relevant info(size, crust, toppings, etc)
function Pizza(size, crust) {
    this.size = size;
    this.crust = crust;
    this.price = 0;
    this.toppings = [];
    this.quantity = 1;
}

Pizza.prototype.calculateSize = function() {
    // This function returns price based on size
    switch (this.size) {
        case "small":
            return 500;
            break;
        case "medium":
            return 1000;
            break;
        case "large":
            return 2000;
        default:
            break;
    }
}

Pizza.prototype.calculateToppings = function() {
    // This function returns price based on toppings
    // toppings are the same in price for now
    return this.toppings.length * 50;
}

Pizza.prototype.calculateCrust = function() {
    // This function returns price based on crust
    switch (this.crust) {
        case "stuffed":
            return 200;
            break;
        case "deep":
        case "pan":
            return 150;
            break;
        case "crispy":
        case "flatbread":
            return 100;
            break;
        default:
            break;
    }
}


Pizza.prototype.getPrice = function() {
    // This function returns the price of the pizza
    // depending on it's size, crust, toppings,
    // and the number of quantity
    let finalPrice = 0;
    finalPrice += this.calculateSize();
    finalPrice += this.calculateToppings();
    finalPrice += this.calculateCrust();
    finalPrice *= this.quantity;
    return finalPrice;
};

// inputs for creating pizza objects
let sizeSelector = document.getElementById("pizza-size");
let crustSelector = document.getElementById("crust-type");
let toppings = document.getElementsByClassName("form-check");
let orderBtn = document.getElementById("order-btn");

// keeps track of all the pizzas ordered
let orders = [];

// Create pizza object when order button is clicked
let createOrder = function() {
    // This function will create a pizza object and 
    // add it to the orders array. Along with this
    // it will add it to the orders section
    console.log("Creating an order");
    let size = sizeSelector.value;
    let crustType = crustSelector.value;
    let order = new Pizza(size, crustType);
    console.log(order);
}

orderBtn.addEventListener("click", createOrder);