import React from "react";
import Link from "next/link";
import { MdArrowRight } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        
        {/* Quick Links Section */}
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold mb-4 underline">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: "Home", path: "./" },
              { name: "Products", path: "/products" },
              { name: "About Us", path: "/about-us" },
              { name: "Careers", path: "/careers" }
            ].map(({ name, path }) => (
              <li key={name}>
                <Link href={path} className="flex items-center space-x-2 text-lg transition group">
                  <MdArrowRight className="text-xl text-gray-600 group-hover:text-gray-400 transition-transform transform group-hover:translate-x-1" />
                  <span className="group-hover:text-gray-400">{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Links Section */}
        <div className="px-6 py-4">
          <ul className="space-y-2 mt-10">
            {[
              { name: "FAQs", path: "/faqs" },
              { name: "Privacy Policy", path: "/privacy-policy" }
            ].map(({ name, path }) => (
              <li key={name}>
                <Link href={path} className="flex items-center space-x-2 text-lg transition group">
                  <MdArrowRight className="text-xl text-gray-600 group-hover:text-gray-400 transition-transform transform group-hover:translate-x-1" />
                  <span className="group-hover:text-gray-400">{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold mb-4 underline">Contact Us</h3>
          <input
            type="email"
            placeholder="Your email address"
            className="w-full p-3 rounded-sm mb-4 bg-gray-400 shadow-xl"
          />
          <button className="w-30 ul bg-green-800 hover:bg-green-700 text-white py-2 px-8 rounded-3xl transition">
            Send
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
