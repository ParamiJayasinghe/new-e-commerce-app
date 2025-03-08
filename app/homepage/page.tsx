"use client";

import FeaturedProducts from "./todaysFeaturedProducts/page";
import BestSellingProducts from "./bestSelling/page";
import TodayDeals from "./todaysDeals/page";
import Footer from "../component/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10 bg-white">
      <FeaturedProducts />
      <BestSellingProducts />
      <TodayDeals /> 
    </div>
  );
}
