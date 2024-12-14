const bandColors = document.querySelectorAll("input[name='bandColor']");
const productImage = document.querySelector('img[alt="watch"]'); 

bandColors.forEach((radio) => {
    radio.addEventListener('change', (event) => {
        const selectedColor = event.target.value;

        // Change the image based on the selected color
        if (selectedColor === "purple") {
            productImage.src = "./images/purple.png";
        } else if (selectedColor === "cyan") {
            productImage.src = "./images/cyan.png";
        } else if (selectedColor === "blue") {
            productImage.src = "./images/blue.png";
        } else if (selectedColor === "black") {
            productImage.src = "./images/black.png";
        }
    });
});

let quantity = 0;
let isCheckoutVisible = false;

// Update quantity
function updateQuantity(change) {
    if (quantity + change >= 0) {
        quantity += change;
        document.getElementById('quantity').textContent = quantity;
        
        // Update item count in the checkout button
        if (isCheckoutVisible) {
            document.getElementById('item-count').textContent = quantity;
        }
        
        // Hide checkout section if quantity is 0
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

// Handle Size
function handleSize(element) {
    const elements = document.querySelectorAll('.flex.items-center.gap-2');
    elements.forEach(el => {
        el.classList.remove('border-[#816BFF]');
        el.classList.add('border-[#DBDFEA]');
        el.querySelector('h3').classList.remove('text-[#816BFF]');
        el.querySelector('h3').classList.add('text-[#364A63]');
    });

    element.classList.remove('border-[#DBDFEA]');
    element.classList.add('border-[#816BFF]');
    element.querySelector('h3').classList.remove('text-[#364A63]');
    element.querySelector('h3').classList.add('text-[#816BFF]');
}

// Handle Modal
function toggleModal() {
    const modal = document.getElementById("popup-modal");
    modal.classList.toggle("hidden");
}