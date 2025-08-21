import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-10">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} FastAPI Booking. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with ❤️ using React, Tailwind, and FastAPI
        </p>
      </div>
    </footer>
  );
}

export default Footer;
