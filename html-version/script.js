// Select all band color radio buttons and the product image
const bandColors = document.querySelectorAll("input[name='bandColor']");
const productImage = document.querySelector('img[alt="watch"]'); 

let selectedBandColor = "#816BFF"; 
let activeSizeElement = null;

// Update product image and store the selected band color
bandColors.forEach((radio) => {
    radio.addEventListener('change', (event) => {
        const selectedColor = event.target.value;

        // Change the image and update the selected band color
        if (selectedColor === "purple") {
            productImage.src = "./images/purple.png";
            selectedBandColor = "#816BFF";
        } else if (selectedColor === "cyan") {
            productImage.src = "./images/cyan.png";
            selectedBandColor = "#1FCEC9";
        } else if (selectedColor === "blue") {
            productImage.src = "./images/blue.png";
            selectedBandColor = "#4B97D3";
        } else if (selectedColor === "black") {
            productImage.src = "./images/black.png";
            selectedBandColor = "#3B4747";
        }

        resetWristSizes(); 
    });
});

// Reset all wrist sizes to the default style
function resetWristSizes() {
    const elements = document.querySelectorAll('.flex.items-center.gap-2');
    elements.forEach(el => {
        el.classList.remove('border-[#816BFF]', 'border-[#1FCEC9]', 'border-[#4B97D3]', 'border-[#3B4747]');
        el.classList.add('border-[#DBDFEA]');
        el.querySelector('h3').classList.remove('text-[#816BFF]', 'text-[#1FCEC9]', 'text-[#4B97D3]', 'text-[#3B4747]');
        el.querySelector('h3').classList.add('text-[#364A63]');
    });
    activeSizeElement = null; 
}

// Handle wrist size selection
function handleSize(element) {
    resetWristSizes(); 

    // Apply the selected color to the clicked element
    element.classList.remove('border-[#DBDFEA]');
    element.classList.add(`border-[${selectedBandColor}]`);
    element.querySelector('h3').classList.remove('text-[#364A63]');
    element.querySelector('h3').classList.add(`text-[${selectedBandColor}]`);
    
    activeSizeElement = element; 
}

// Handle cart quantity update
let quantity = 0;
let isCheckoutVisible = false;

function updateQuantity(change) {
    if (quantity + change >= 0) {
        quantity += change;
        document.getElementById('quantity').textContent = quantity;

        if (quantity === 0) {
            document.getElementById('checkout-section').classList.add('hidden');
            isCheckoutVisible = false;
        }
    }
}

// Handle Add to Cart button
function addToCart() {
    if (quantity > 0) {
        // Get product details
        const productDetails = {
            image: productImage.src,                 
            name: document.querySelector("h1").textContent,  
            wristSize: activeSizeElement ? activeSizeElement.querySelector("h3").textContent : "N/A",  
            price: parseFloat(activeSizeElement ? activeSizeElement.querySelector("h4").textContent.replace('$', '') : 0),
            quantity: quantity,                        
            bandColor: getBandColorName(selectedBandColor)             
        };

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if the item already exists in the cart
        const existingItemIndex = cart.findIndex(item => 
            item.bandColor === productDetails.bandColor &&
            item.wristSize === productDetails.wristSize
        );

        // If item exists, update quantity
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push(productDetails);
        }

        localStorage.setItem("cart", JSON.stringify(cart)); 

        // Display the updated cart items
        displayCartItems();

        document.getElementById('checkout-section').classList.remove('hidden');
        isCheckoutVisible = true;

        // Reset quantity after adding to cart
        quantity = 0;
        document.getElementById('quantity').textContent = quantity;
    }
}

function getBandColorName(hexColor) {
    if (hexColor === "#816BFF") {
        return "Purple";
    } else if (hexColor === "#1FCEC9") {
        return "Cyan";
    } else if (hexColor === "#4B97D3") {
        return "Blue";
    } else if (hexColor === "#3B4747") {
        return "Black";
    } else {
        return "Purple";
    }
}

// Handle modal toggle 
function toggleModal() {
    const modal = document.getElementById("popup-modal");
    modal.classList.toggle("hidden");
}

// Handle checkout modal
function checkoutModal() {
    const modal = document.getElementById("checkout-modal");
    modal.classList.remove("hidden");

    localStorage.removeItem("cart");

    // Reset the cart quantity and UI elements
    document.getElementById('quantity').textContent = 0;
    document.getElementById('item-count').textContent = 0;
    document.getElementById('checkout-section').classList.add('hidden');
    isCheckoutVisible = false;
}

// Handle checkout close modal
function closeModal() {
    const modal = document.getElementById("checkout-modal");
    modal.classList.add("hidden");
    window.location.reload(); 
}

window.addEventListener('load', () => {
    displayCartItems();

    // Check cart items and checkout button visibility
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
        document.getElementById('checkout-section').classList.remove('hidden');
    } else {
        document.getElementById('checkout-section').classList.add('hidden');
    }
});

// Handle display cart details
function displayCartItems() {
    const cartTableBody = document.querySelector('tbody');
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Clear existing rows
    cartTableBody.innerHTML = '';

    if (cart.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="5" class="text-center py-4">Your cart is empty.</td></tr>';
    }

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('text-[#364A63]');
        row.classList.add('border-b');

        row.innerHTML = `
            <td class="pr-4 py-3">
                <div class="flex flex-col md:flex-row items-center">
                    <img class="w-12 h-12 rounded" src="${item.image}">
                    <div class="ml-2">
                        <p>${item.name}</p>
                    </div>
                </div>
            </td>
            <td class="px-4 py-3 text-center">${item.bandColor}</td>
            <td class="px-4 py-3 text-center font-semibold">${item.wristSize}</td>
            <td class="px-4 py-3 text-center font-semibold">${item.quantity}</td>
            <td class="text-right py-3 font-semibold">$${(item.price * item.quantity).toFixed(2)}</td>
        `;

        cartTableBody.appendChild(row);
    });

    const distinctItemsCount = cart.length; 
    document.getElementById('item-count').textContent = distinctItemsCount;

    updateTotalRow(cart);
}

// Update table row
function updateTotalRow(cart) {
    const cartTableBody = document.querySelector('tbody');
    const totalRow = document.querySelector('tbody tr:last-child');

    if (cart.length > 0) {
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (!totalRow || !totalRow.classList.contains('total-row')) {
            const totalRow = document.createElement('tr');
            totalRow.classList.add('total-row', 'text-[#364A63]');
            totalRow.innerHTML = `
                <td class="pr-4 py-5 text-lg font-semibold">Total</td>
                <td class="px-4 py-5 text-center"></td>
                <td class="px-4 py-5 text-center"></td>
                <td class="px-4 py-5 text-center font-semibold">${totalQuantity}</td>
                <td class="text-right py-5 text-lg font-semibold">$${totalPrice}</td>
            `;
            cartTableBody.appendChild(totalRow);
        } else {
            totalRow.innerHTML = `
                <td class="pr-4 py-5 text-lg font-semibold">Total</td>
                <td class="px-4 py-5 text-center"></td>
                <td class="px-4 py-5 text-center"></td>
                <td class="px-4 py-5 text-center font-semibold">${totalQuantity}</td>
                <td class="text-right py-5 text-lg font-semibold">$${totalPrice}</td>
            `;
        }
    }
}
