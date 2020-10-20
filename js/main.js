// Pizza object that handles storing qll 
// relevant info(size, crust, toppings, etc)
function Pizza(size, crust) {
    this.size = size;
    this.crust = crust;
    this.price = 0;
    this.toppings;
    this.quantity = 1;
}

Pizza.prototype.getSize = function() {
    return this.size[0].toUpperCase() + this.size.substring(1);
}

Pizza.prototype.getCrust = function() {
    return this.crust[0].toUpperCase() + this.crust.substring(1);
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

// list of orders
let listOfOrders = document.getElementById("orders");

// keeps track of all the pizzas ordered
let orders = [];

// Keeps track of all quantity counters
let quantityCounters;

// keeps track of delivery buttons
let wantsDelivery = document.getElementById("delivery-yes")

// keeps track of the checkout button and status
let checkoutBtn = document.getElementById("checkout-btn");
let checkoutPressed = false;

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
    // This functions updates the count displayed 
    // in the badge of the orders section
    let count = document.getElementById("order-count");
    count.innerText = orders.length;
}

let createOrderCard = function(order) {
    // This function creates a card that displays
    // the order's size, price, quanity, crust, and toppings
    let card = document.createElement("li");
    card.classList.add("list-group-item");
    card.classList.add("card-body");

    let title = document.createElement("h4");
    title.innerText = `${order.getSize()} Pizza ˣ`
    title.classList.add("card-title");

    let quantity = document.createElement("span");
    quantity.classList.add("quantity-counter");
    quantity.innerHTML = 'Quantity: <input style="width: 60px;" value="1" type="number" name="" id="">'

    let price = document.createElement("div");
    price.innerText = `Price: ${order.getPrice()} Ksh`;

    let crust = document.createElement("h6");
    crust.innerText = `with ${order.getCrust()} Crust`;
    crust.classList.add("card-subtitle");
    crust.classList.add("text-muted");

    let toppingText = document.createElement("span");
    toppingText.innerText = "Toppings: ";
    toppingText.classList.add("toppings-text");

    order.toppings.forEach(function(topping) {
        toppingText.innerText += topping.lastElementChild.innerText + ", ";
    });

    // remove comma at end
    toppingText.innerText = toppingText.innerText.substring(0, toppingText.innerText.length-2);

    card.appendChild(title);
    card.appendChild(crust);
    card.appendChild(quantity);
    card.appendChild(price);
    card.appendChild(toppingText);

    return card;
}

let displayOrders = function(order) {
    // This function displays all the orders 
    // in the orders section on the right side
    hideNoOrders();
    updateOrderCount();
    listOfOrders.appendChild(createOrderCard(order)); 

    // Update price if quantity changes
    quantityCounters = document.getElementsByClassName("quantity-counter");

    if(!(quantityCounters == undefined)) {
        Array.from(quantityCounters).forEach(function(counter) {
            counter.addEventListener("focusout", function() {
                order.quantity = +counter.lastElementChild.value;
                counter.parentElement.children[3].innerText = `Price: ${order.getPrice()} KSH`;
                console.log(counter.parentElement.children[3]);
            });
        });
    }
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

    displayOrders(order);
    
    // Update delivery charge message
    if((orders.length > 1) && (wantsDelivery.checked)) {
        updateDeliveryPrice();
    }
}

// Respond to pizza order
orderBtn.addEventListener("click", createOrder);

// Respond to delivery request
let updateDeliveryPrice = function() {
    let cost = orders.length * 80; 
    alert(`Update: Your Delivery will now cost ${cost} Ksh`);
}

let showDeliveryPrice = function() {
    // This function will alert the user of the delivery price
    let cost = orders.length * 80; 
    alert(`Your Delivery will cost ${cost} Ksh`);
}

wantsDelivery.addEventListener("click", function() {
    if(orders.length != 0) {
        let location = prompt("Where would you like the delivery to be made?");
        alert(`Your order will be delivered to '${location}'`);
        showDeliveryPrice();
    } else {
        alert("Please make an order first.");
        wantsDelivery.checked = false;
    }
});

// Handle checkout
let getTotalPrice = function() {
    let prices = orders.map(function(order) {
        return order.getPrice();
    });
    let totalPrice = prices.reduce(function(total, num) {
        return total + num;
    });
    return totalPrice;
}
let createTotalCard = function() {
    let total = document.createElement("li");
    total.innerText = `Total Price: ${getTotalPrice()}`;
    total.classList.add("list-group-item");
    total.classList.add("total");
    return total;
}

let updateCheckout = function() {
    let total = document.getElementsByClassName("total");
    total.innerText = `Total Price: ${getTotalPrice()}`;
}

checkoutBtn.addEventListener("click", function() {
    if(checkoutPressed) {
        updateCheckout();
    } else {
        let totalCard = createTotalCard();
        let card = document.getElementById("total");
        card.appendChild(totalCard);
    }
    checkoutPressed = true;
});