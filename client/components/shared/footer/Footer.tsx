import React from 'react';
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">

        <div className="border-t border-gray-200 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Booking.com. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="mailto:info@booking.com" className="flex items-center text-gray-500 hover:text-primary-600 transition-colors text-sm">
              <Mail className="w-4 h-4 mr-2" />
              info@booking.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;