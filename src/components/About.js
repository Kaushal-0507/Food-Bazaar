import React from "react";
import { FaUtensils, FaMotorcycle, FaStar, FaCity } from "react-icons/fa";
const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-8 mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Redefining Food Discovery</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Connecting hungry customers to their favorite restaurants since 2015
        </p>
      </div>

      {/* Platform Introduction */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Your Gateway to Culinary Delights
        </h2>
        <p className="text-gray-600 text-lg max-w-4xl mx-auto">
          We're not just a food delivery platform - we're a food ecosystem. From
          neighborhood favorites to premium dining, we bring the city's best
          restaurants to your doorstep.
        </p>
      </div>

      {/* Value Propositions */}
      <div className=" gap-6 mb-12 flex ">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaUtensils className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">10,000+ Restaurants</h3>
          <p className="text-gray-600">
            Discover everything from street food to fine dining across 100+
            cuisines
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaMotorcycle className="text-4xl text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Lightning Fast Delivery</h3>
          <p className="text-gray-600">
            Average delivery time of 30 minutes with our optimized logistics
            network
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaStar className="text-4xl text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Verified Reviews</h3>
          <p className="text-gray-600">
            5 million+ authentic customer reviews to guide your choices
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          How Our Platform Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Discover Restaurants</h3>
            <p className="text-gray-600">
              Browse curated lists, search by cuisine, or explore trending spots
              near you
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-500 font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Place Your Order</h3>
            <p className="text-gray-600">
              Customize your meal, apply discounts, and checkout securely
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-500 font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Enjoy Your Food</h3>
            <p className="text-gray-600">
              Track your order in real-time until it arrives at your doorstep
            </p>
          </div>
        </div>
      </div>

      {/* Restaurant Partnership */}
      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            For Restaurant Partners
          </h2>
          <p className="text-gray-600 mb-4">
            We empower restaurants of all sizes to grow their business through:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Increased visibility to millions of potential customers
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Our reliable delivery fleet and logistics support
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Data-driven insights to optimize your operations
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Marketing tools to attract and retain customers
            </li>
          </ul>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Restaurant kitchen"
            className="rounded-lg w-full"
          />
        </div>
      </div>

      {/* Community Impact */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          More Than Just Food Delivery
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-6">
          We're committed to creating positive change in the communities we
          serve
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div>
            <div className="text-3xl font-bold mb-2">500+</div>
            <div>Local Suppliers Supported</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">10,000+</div>
            <div>Delivery Partners Empowered</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">1M+</div>
            <div>Meals Donated Through Our Foundation</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
