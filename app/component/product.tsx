import Image from "next/image";
import { FaRegHeart, FaStar } from "react-icons/fa"; 

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  
  const filledStars = Array.from({ length: 5 }, (_, index) => (
    <FaStar
      key={index}
      className={`w-4 h-4 ${index < product.rating ? "text-green-500" : "text-gray-300"}`}
      />
  ));

  return (
    <div className="relative bg- shadow-lg rounded-lg p-6 text-center  w-full h-[500px] mx-auto transition-transform hover:scale-105 duration-300 mb-4">
      {/* Outline Heart Icon (Moved to Top Left) */}
      <div className="absolute top-2 right-5 bg-gray-200 rounded-full p-1 shadow cursor-pointer hover:scale-110 transition">
        <FaRegHeart className="w-6 h-6 text-red-500" />
      </div>

      {/* Image Section */}
<div className="p-4 h-2/3 flex items-center justify-center">
  <Image
    src={product.image}
    alt={product.name}
    width={200}
    height={200}
    className="w-full h-full object-contain rounded-lg"
  />
</div>

      {/* Name and Price in One Line with Increased Font Size and Spacing */}
      <div className="flex justify-between items-start mt-6 text-lg md:text-xl">
        <h2 className="font-semibold text-gray-800 leading-tight truncate">{product.name}</h2>
        <h2 className="text-gray-800 font-bold ml-8 text-lg">LKR {product.price.toFixed(2)}</h2> 
      </div>
      

      {/* Green-Filled Stars */}
      <div className="flex space-x-1 mt-2">
        {filledStars} {/* Display Filled Green Stars */}
      </div>

      {/* Add to Cart Button (Longer with Rounded Corners) */}
      <button className="mt-6 border-2 border-green-500 text-green-500 bg-transparent py-3 px-8 rounded-3xl hover:bg-green-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 text-sm md:text-base">
      Add to Cart
      </button>


    </div>
  );
};

export default ProductCard; 