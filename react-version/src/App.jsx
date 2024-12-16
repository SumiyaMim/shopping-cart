import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { HiOutlineHeart } from "react-icons/hi";
import purpleImage from './assets/images/purple.png';
import cyanImage from './assets/images/cyan.png';
import blueImage from './assets/images/blue.png';
import blackImage from './assets/images/black.png';

function App() {
  const [selectedColor, setSelectedColor] = useState("purple");
  const [image, setImage] = useState(purpleImage);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // handle band color
  const handleColorChange = (event) => {
    const color = event.target.value;
    setSelectedColor(color);

    // handle image based on color
    if (color === "purple") {
      setImage(purpleImage);
    } else if (color === "cyan") {
      setImage(cyanImage);
    } else if (color === "blue") {
      setImage(blueImage);
    } else if (color === "black") {
      setImage(blackImage);
    }
  };

  // handle border and text color
  const getColorForSize = () => {
    if (selectedColor === "purple") {
      return "#816BFF";
    } else if (selectedColor === "cyan") {
      return "#1FCEC9";
    } else if (selectedColor === "blue") {
      return "#4B97D3";
    } else if (selectedColor === "black") {
      return "#3B4747";
    } else {
      return "#364A63";
    }
  };

  // handle wrist size
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // handle quantity
  const handleQuantity = (change) => {
    if (quantity + change >= 0) {
      setQuantity(quantity + change);
    }
  };

  // get cart items from localStorage on page load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // handle add to cart 
  const handleCart = () => {
    if (quantity > 0) {
      const productDetails = {
        name: "Classy Modern Smart Watch",
        size: selectedSize ? selectedSize : "N/A",
        color: selectedColor,
        price: selectedSize === "S" ? 69 : selectedSize === "M" ? 79 : selectedSize === "L" ? 89 : 99,
        image: image,
        quantity: quantity,
      };

      // get product details in from
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // check the color and size
      const existingItem= cart.findIndex(
        item => item.color === productDetails.color && item.size === productDetails.size
      );

      // update quantity
      if (existingItem !== -1) {
        cart[existingItem].quantity += quantity;
      } else {
        // add new product
        cart.push(productDetails);
      }

      // store updated product details to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // update cart items state 
      setCartItems(cart);
      
      // reset quantity
      setQuantity(0); 
    }
  };

  // calculate total quantity and total price
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  // handle toggle modal 
  const toggleModal = () => {
    setCheckoutModal(!checkoutModal);
  };

  // handle checkout open modal button
  const openModal = () => {
    setIsModalOpen(true);
  };

  // handle checkout close modal
  const closeModal = () => {
    setIsModalOpen(false);

    // clear cart data in localStorage
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));

    setCheckoutModal(!checkoutModal);
  };

  return (
    <>
      <div className="md:flex md:justify-center md:items-center lg:h-screen font-roboto">
        <div className="flex flex-col md:flex-row md:items-center justify-center p-10 md:p-7 lg:px-[235px] gap-10 lg:gap-16">
          {/* Product Image */}
          <div className="lg:w-2/5">
            <img
              src={image} 
              alt="thumbnail"
              className="w-full h-full md:w-[1000px] md:h-[550px] lg:w-[450px] lg:h-[550px]"
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            {/* Product Title */}
            <h1 className="text-[#364A63] font-bold text-[26px] lg:text-4xl mb-2.5">
              Classy Modern Smart Watch
            </h1>

            {/* Product Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="text-[#FFD200] flex items-center gap-1.5 text-base">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
                <FaRegStar />
              </div>
              <div className="text-[#8091A7] text-sm">
                <p>(2 Reviews)</p>
              </div>
            </div>

            {/* Product Price */}
            <div className="flex items-center space-x-1.5 mb-4">
              <span className="text-[#8091A7] text-lg line-through">$99.00</span>
              <span className="text-[#6576FF] text-2xl font-bold">$79.00</span>
            </div>

            {/* Product Description */}
            <p className="text-[#8091A7] leading-7 mb-4">
              I must explain to you how all this mistaken idea of denouncing
              praising pain was born, and I will give you a complete account of
              the system, and expound the actual teaching.
            </p>

            {/* Product Specifications */}
            <div className="flex items-center gap-10 mb-5">
              <div>
                <h6 className="text-[#8091A7] text-xs mb-1">Type</h6>
                <h4 className="text-[#364A63] font-semibold text-sm">Watch</h4>
              </div>
              <div>
                <h6 className="text-[#8091A7] text-xs mb-1">Model Number</h6>
                <h4 className="text-[#364A63] font-semibold text-sm">Forerunner 290XT</h4>
              </div>
            </div>

            {/* Band Color Section */}
            <h5 className="text-[#364A63] font-semibold mb-3">Band Color</h5>
            <div className="flex space-x-4 mb-4">
              {/* Purple */}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bandColor"
                  value="purple"
                  className="hidden peer"
                  checked={selectedColor === "purple"}
                  onChange={handleColorChange}
                />
                <div className="w-5 h-5 rounded-full border-[#816BFF] bg-[#816BFF] peer-checked:ring-2 peer-checked:ring-[#816BFF] peer-checked:ring-offset-2"></div>
              </label>
              {/* Cyan */}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bandColor"
                  value="cyan"
                  className="hidden peer"
                  checked={selectedColor === "cyan"}
                  onChange={handleColorChange}
                />
                <div className="w-5 h-5 rounded-full bg-[#1FCEC9] peer-checked:ring-2 peer-checked:ring-[#1FCEC9] peer-checked:ring-offset-2"></div>
              </label>
              {/* Blue */}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bandColor"
                  value="blue"
                  className="hidden peer"
                  checked={selectedColor === "blue"}
                  onChange={handleColorChange}
                />
                <div className="w-5 h-5 rounded-full bg-[#4B97D3] peer-checked:ring-2 peer-checked:ring-[#4B97D3] peer-checked:ring-offset-2"></div>
              </label>
              {/* Black */}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bandColor"
                  value="black"
                  className="hidden peer"
                  checked={selectedColor === "black"}
                  onChange={handleColorChange}
                />
                <div className="w-5 h-5 rounded-full bg-[#3B4747] peer-checked:ring-2 peer-checked:ring-[#3B4747] peer-checked:ring-offset-2"></div>
              </label>
            </div>

            {/* Size Section */}
            <h5 className="text-[#364A63] font-semibold mb-2.5">Wrist Size</h5>
            <div className="flex items-center gap-2 md:gap-3 mb-4">
              {/* Size S */}
              <div
                className="flex items-center gap-2 border-2 text-sm px-4 md:px-5 py-2 rounded"
                style={{
                  borderColor: selectedSize === "S" ? getColorForSize() : "#DBDFEA",
                  color: selectedSize === "S" ? getColorForSize() : "#364A63",
                }}
                onClick={() => handleSizeChange("S")}
              >
                <h3 className="font-bold">S</h3>
                <h4 className="text-[#8091A7]">$69</h4>
              </div>

              {/* Size M */}
              <div
                className="flex items-center gap-2 border-2 text-sm px-4 md:px-5 py-2 rounded"
                style={{
                  borderColor: selectedSize === "M" ? getColorForSize() : "#DBDFEA",
                  color: selectedSize === "M" ? getColorForSize() : "#364A63",
                }}
                onClick={() => handleSizeChange("M")}
              >
                <h3 className="font-bold">M</h3>
                <h4 className="text-[#8091A7]">$79</h4>
              </div>

              {/* Size L */}
              <div
                className="flex items-center gap-2 border-2 text-sm px-4 md:px-5 py-2 rounded"
                style={{
                  borderColor: selectedSize === "L" ? getColorForSize() : "#DBDFEA",
                  color: selectedSize === "L" ? getColorForSize() : "#364A63",
                }}
                onClick={() => handleSizeChange("L")}
              >
                <h3 className="font-bold">L</h3>
                <h4 className="text-[#8091A7]">$89</h4>
              </div>

              {/* Size XL */}
              <div
                className="flex items-center gap-2 border-2 text-sm px-4 md:px-5 py-2 rounded"
                style={{
                  borderColor: selectedSize === "XL" ? getColorForSize() : "#DBDFEA",
                  color: selectedSize === "XL" ? getColorForSize() : "#364A63",
                }}
                onClick={() => handleSizeChange("XL")}
              >
                <h3 className="font-bold">XL</h3>
                <h4 className="text-[#8091A7]">$99</h4>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="flex items-center space-x-4">
              {/* Quantity Selector */}
              <div className="flex items-center border-2 border-[#DBDFEA] rounded-md">
                <button
                  className="px-3 py-2 text-[#8091A7]"
                  onClick={() => handleQuantity(-1)}
                  disabled={quantity === 0} 
                >
                  <FaMinus />
                </button>
                <div
                  id="quantity"
                  className="px-6 py-2 text-[#364A63] font-medium border-l-2 border-r-2 border-[#DBDFEA]"
                >
                  {quantity}
                </div>
                <button
                  className="px-3 py-2 text-[#8091A7]"
                  onClick={() => handleQuantity(1)}
                >
                  <FaPlus />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                className="px-5 py-[11.6px] bg-[#6576FF] text-white text-sm font-medium rounded-md hover:bg-[#6172f8]"
                onClick={handleCart}
                disabled={quantity <= 0}
              >
                Add to Cart
              </button>

              {/* Wishlist Icon */}
              <HiOutlineHeart className="text-[#6576FF] text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Section */}
      <div id="checkout-section" className={`flex justify-center items-center mt-6 mb-16 ${cartItems.length === 0 ? 'hidden' : ''}`}>
        {cartItems.length > 0 && (
          <button
            id="checkout-button"
            className="block flex items-center justify-center space-x-3 px-6 py-3 bg-[#FFBB5A] font-bold text-[#364A63] rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-[#f5b254]"
            type="button"
            onClick={toggleModal}
          >
            <span>Checkout</span>
            <span id="item-count" className="flex items-center justify-center w-6 h-6 bg-white text-sm rounded-md">
              {cartItems.length}
            </span>
          </button>
        )}
      </div>

      {/* Checkout Modal */}
      {checkoutModal && (
        <div
          id="popup-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-[90%] md:w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 overflow-y-auto">
            <div className="p-4 md:p-10">
              <h3 className="mb-2 text-xl font-bold text-[#364A63]">
                Your Cart
              </h3>

              {/* Cart Table */}
              <table className="w-full text-left text-sm text-[#8091A7] mb-6">
                <thead>
                  <tr className="border-b text-[#8091A7]">
                    <th className="pr-4 py-3 font-normal">Item</th>
                    <th className="px-4 py-3 text-center font-normal">Color</th>
                    <th className="px-4 py-3 text-center font-normal">Size</th>
                    <th className="px-4 py-3 text-center font-normal">Qnt</th>
                    <th className="text-right py-3 font-normal">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                      <tr className="text-[#364A63] border-b" key={index}>
                        <td className="pr-4 py-3">
                          <div className="flex flex-col md:flex-row items-center">
                            <img className="w-12 h-12 rounded" src={item.image} alt="Item" />
                            <div className="ml-2">
                              <p>{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">{item.color.charAt(0).toUpperCase() + item.color.slice(1)}</td>
                        <td className="px-4 py-3 text-center font-semibold">{item.size}</td>
                        <td className="px-4 py-3 text-center font-semibold">{item.quantity}</td>
                        <td className="text-right py-3 font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                  ))}
                    
                  <tr className="text-[#364A63]">
                    <td className="pr-4 py-5 text-lg font-semibold">Total</td>
                    <td className="px-4 py-5 text-center"></td>
                    <td className="px-4 py-5 text-center"></td>
                    <td className="px-4 py-5 text-center font-semibold">{totalQuantity}</td>
                    <td className="text-right py-5 text-lg font-semibold">${totalPrice}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end items-center space-x-5">
                <button
                  onClick={toggleModal}
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-[#6576FF] focus:outline-none"
                >
                  Continue Shopping
                </button>
                <button
                  className="py-2.5 px-5 text-sm font-medium text-white bg-[#6576FF] hover:bg-[#5d6ef6] rounded-md focus:outline-none"
                  onClick={openModal}
                >
                  Checkout
                </button>

                {/* Checkout Modal */}
                {isModalOpen && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md w-4/5 md:w-1/2 lg:w-1/3 relative">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Order Confirmation</h2>
                        <button
                          onClick={closeModal}
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                        >
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      <p>Your order has been placed successfully!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
