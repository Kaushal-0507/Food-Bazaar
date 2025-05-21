import React from "react";
import {
  FaHeadset,
  FaMapMarkerAlt,
  FaClock,
  FaMobileAlt,
  FaStore,
} from "react-icons/fa";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Thank you for contacting us! Our team will respond within 24 hours."
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-8 mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">We're Here to Help</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Contact our 24/7 support team for any questions or issues
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 mb-2">
                Subject
              </label>
              <select
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Select an option</option>
                <option value="order">Order Issue</option>
                <option value="delivery">Delivery Problem</option>
                <option value="payment">Payment Concern</option>
                <option value="restaurant">Restaurant Partnership</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-lg font-bold hover:from-red-600 hover:to-orange-600 transition-colors"
            >
              Submit Message
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Quick Support
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <FaHeadset className="text-red-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">24/7 Customer Care</h3>
                  <p className="text-gray-600">+91 12345 67890</p>
                  <p className="text-gray-600">support@foodbazaar.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <FaStore className="text-orange-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Restaurant Partners
                  </h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                  <p className="text-gray-600">partners@foodbazaar.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <FaMobileAlt className="text-yellow-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">App Support</h3>
                  <p className="text-gray-600">+91 87654 32109</p>
                  <p className="text-gray-600">appsupport@foodbazaar.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Our Headquarters
            </h2>
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaMapMarkerAlt className="text-blue-500 text-xl" />
              </div>
              <div>
                <p className="text-gray-600">
                  FoodBazaar Technologies Pvt. Ltd.
                  <br />
                  22nd Floor, Tower B<br />
                  ABC 122002, India
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaClock className="text-green-500 text-xl" />
              </div>
              <div>
                <p className="text-gray-600">
                  Monday to Friday: 9:00 AM - 7:00 PM
                  <br />
                  Saturday: 10:00 AM - 5:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Find Us on Map
        </h2>
        <div className="rounded-lg overflow-hidden">
          <iframe
            title="FoodExpress Headquarters"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.223468354734!2d77.09089731507986!3d28.502482982469827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d193f5f5a7f07%3A0x7f1b0b5b5b5b5b5b!2sCyber%20City%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Connect With Us
        </h2>
        <div className="flex justify-center space-x-6">
          {[
            { name: "Twitter", icon: "🐦", color: "text-blue-400" },
            { name: "Facebook", icon: "👍", color: "text-blue-600" },
            { name: "Instagram", icon: "📷", color: "text-pink-500" },
            { name: "LinkedIn", icon: "💼", color: "text-blue-700" },
          ].map((social, index) => (
            <a
              key={index}
              href="#"
              className={`text-3xl ${social.color} hover:scale-110 transition-transform`}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
