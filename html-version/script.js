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

        if (isCheckoutVisible) {
            document.getElementById('item-count').textContent = quantity;
        }

        if (quantity === 0) {
            document.getElementById('checkout-section').classList.add('hidden');
            isCheckoutVisible = false;
        }
    }
}

// Handle "Add to Cart" button click
function addToCart() {
    if (quantity > 0) {
        document.getElementById('checkout-section').classList.remove('hidden');
        document.getElementById('item-count').textContent = quantity;
        isCheckoutVisible = true;
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
}

// Handle checkout close modal
function closeModal() {
    const modal = document.getElementById("checkout-modal");
    modal.classList.add("hidden");
    window.location.reload(); 
}
