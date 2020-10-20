// Pizza object that handles storing qll 
// relevant info(size, crust, toppings, etc)
function Pizza(size, crust) {
    this.size = size;
    this.crust = crust;
    this.price = 0;
    this.toppings;
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
let toppings = Array.from(document.getElementsByClassName("form-check"));
let orderBtn = document.getElementById("order-btn");

// keeps track of all the pizzas ordered
let orders = [];

let getArrOfToppings = function(toppings) {
    // This function returns an array of all the checked toppings
    let arr = [];
    toppings.forEach(function(topping) {
        if(topping.firstElementChild.checked) {
            arr.push(topping)
        } 
    });
    return arr;
}

let hideNoOrders = function() {
     // This function hides no orders text in Orders section
    if(orders.length === 1) {
        let noOrder = document.getElementById("no-order");
        noOrder.classList.add("hide-no-order");
    }
}

let updateOrderCount = function() {
    let count = document.getElementById("order-count");
    count.innerText = orders.length;
}

let displayOrders = function() {
    // This function displays all the orders 
    // in the orders section on the right side
    hideNoOrders();
    updateOrderCount();

}

// Create pizza object when order button is clicked
let createOrder = function() {
    // This function will create a pizza object and 
    // add it to the orders array. Along with this
    // it will add it to the orders section
    console.log("Creating an order");

    let size = sizeSelector.value;
    let crustType = crustSelector.value;
    let order = new Pizza(size, crustType);
    order.toppings = getArrOfToppings(toppings);

    console.log(order);
    orders.push(order)

    displayOrders();
}

orderBtn.addEventListener("click", createOrder);