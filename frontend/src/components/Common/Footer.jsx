import React from 'react';

const Footer = () => (
    <footer className="border-t border-gray-200 bg-white py-4 px-6 mt-auto">
        <div className="flex items-center justify-between text-gray-400 text-xs">
            <p>© {new Date().getFullYear()} StoreHub</p>
            <p>Store Rating Platform</p>
        </div>
    </footer>
);

export default Footer;
