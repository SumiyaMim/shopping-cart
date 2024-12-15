import { useState } from "react";
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
  const [cartItems, setCartItems] = useState(0);

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

  // handle add to cart 
  const handleCart = () => {
    if (quantity > 0) {
      setCartItems(cartItems + quantity);
      setQuantity(0); 
    }  
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
      <div id="checkout-section" className={`flex justify-center items-center mt-6 mb-16 ${cartItems === 0 ? 'hidden' : ''}`}>
      {cartItems > 0 && (
        <button
          id="checkout-button"
          className="block flex items-center justify-center space-x-3 px-6 py-3 bg-[#FFBB5A] font-bold text-[#364A63] rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-[#f5b254]"
          type="button"
        >
          <span>Checkout</span>
          <span id="item-count" className="flex items-center justify-center w-6 h-6 bg-white text-sm rounded-md">
            {cartItems}
          </span>
        </button>
      )}
    </div>
    </>
  );
}

export default App;
